import json
import boto3

# Initialize AWS resources
dynamodb = boto3.resource('dynamodb')

users_table = dynamodb.Table('1059_UserRegistrationTable')  # Replace with your users' table name
candidates_table = dynamodb.Table('1059_CandidateTable')  # Replace with your candidates' table name
sns_client = boto3.client('sns')


# Replace with the ARN of your SNS topic
sns_topic_arn = 'arn:aws:sns:us-east-1:417267928402:1059_mail_sns'

def lambda_handler(event, context):
    try:
        user_id = event['queryStringParameters']['userId']
        candidate_id = event['queryStringParameters']['candidateId']

        # Update the 'has_voted' flag in the users' table
        users_update_response = users_table.update_item(
            Key={'userId': user_id},
            UpdateExpression='SET has_voted = :v',
            ExpressionAttributeValues={':v': True}
        )

        

    except Exception as user_update_error:
        # Log the user update error
        user_error_message = f'Error updating users table: {str(user_update_error)}, userId: {user_id}'
        print(user_error_message)
        
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error updating users table'}),
        }
        return response

    try:
        # Check if the candidate's current vote count exists
        candidate_response = candidates_table.get_item(
            Key={'candidateId': candidate_id}
        )

        # If 'numberOfVotes' attribute doesn't exist, set it to 1
        if 'Item' not in candidate_response:
            updated_votes = 1
        else:
            # Increment the 'numberOfVotes' attribute
            current_votes = candidate_response['Item'].get('numberOfVotes', 0)
            updated_votes = current_votes + 1

        # Update the 'numberOfVotes' in the candidates' table
        candidates_update_response = candidates_table.update_item(
            Key={'candidateId': candidate_id},
            UpdateExpression='SET numberOfVotes = :votes',
            ExpressionAttributeValues={':votes': updated_votes}
        )
        
        
        
        # Get the user's email from the users' table
        user_info = users_table.get_item(Key={'userId': user_id})
        user_email = user_info.get('Item', {}).get('email', '')

        # Send a thank-you email to the user via SNS
        if user_email:
            send_thank_you_email(user_email)
        
        
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Vote recorded successfully'}),
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }
        
        dynamodb = boto3.client('dynamodb')
        s3 = boto3.client('s3')
        
        # Define the DynamoDB table and S3 bucket details
        dynamodb_table_name = '1059_CandidateTable'
        s3_bucket_name = '1059-candidatevote'
        s3_object_key = 'output.json'  # Specify the desired object key in the S3 bucket
        # Query DynamoDB for the data you want to export
        dynamo_response = dynamodb.scan(
            TableName=dynamodb_table_name
        )
        
        # Extract the relevant data from the DynamoDB response
        items = dynamo_response['Items']
        
        # Convert the data to JSON format
        data_to_export = json.dumps(items, indent=2)
        
        # Write the JSON data to an S3 object
        s3.put_object(
            Bucket=s3_bucket_name,
            Key=s3_object_key,
            Body=data_to_export
        )

    except Exception as candidates_update_error:
        # Log the candidates update error
        candidates_error_message = f'Error updating candidates table: {str(candidates_update_error)}, candidateId: {candidate_id}'
        print(candidates_error_message)
        
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error updating candidates table'}),
        }

    return response

def send_thank_you_email(user_email):
    # Customize the message and subject of the email
    message = "Thank you for your vote!"
    subject = "Vote Confirmation"

    try:
        # Publish a message to the SNS topic
        sns_client.publish(
            TopicArn=sns_topic_arn,
            Message=message,
            Subject=subject
        )
        print(f'Thank-you email sent to {user_email} via SNS')

    except Exception as sns_error:
        # Log any SNS publishing errors
        sns_error_message = f'Error sending thank-you email to {user_email} via SNS: {str(sns_error)}'
        print(sns_error_message)
    