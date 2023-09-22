import boto3
import json

def lambda_handler(event, context):
    # Initialize AWS SDK clients for DynamoDB and S3
    dynamodb = boto3.client('dynamodb')
    s3 = boto3.client('s3')
    
    # Define the DynamoDB table and S3 bucket details
    dynamodb_table_name = '1059_CandidateTable'
    s3_bucket_name = '1059-candidatevote'
    s3_object_key = 'output.json'  # Specify the desired object key in the S3 bucket
    
    try:
        # Query DynamoDB for the data you want to export
        response = dynamodb.scan(
            TableName=dynamodb_table_name
        )
        
        # Extract the relevant data from the DynamoDB response
        items = response['Items']
        
        # Convert the data to JSON format
        data_to_export = json.dumps(items, indent=2)
        
        # Write the JSON data to an S3 object
        s3.put_object(
            Bucket=s3_bucket_name,
            Key=s3_object_key,
            Body=data_to_export
        )
        
        return {
            'statusCode': 200,
            'body': 'Data exported to S3 successfully.'
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }
