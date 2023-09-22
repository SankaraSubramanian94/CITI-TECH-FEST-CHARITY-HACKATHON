import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        # Parse query parameters from the event
        user_id = event['queryStringParameters']['userId']
        print('User_ID is:',user_id)
        task_name = event['queryStringParameters']['taskName']
        print('Task_Name is:',task_name)
        
        # Ensure valid task names, you can customize this as needed
        valid_task_names = ['learnAboutCandidates', 'findPollingStation', 'registerToVote']
        if task_name not in valid_task_names:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid taskName'})
            }

        # Get the current value of the specified task field from DynamoDB
        response = dynamodb.get_item(
            TableName='1059_Task',
            Key={'userId': {'S': user_id}}
        )

        # Toggle the boolean value of the specified task
        current_value = response['Item'][task_name]['BOOL']
        new_value = not current_value  # Toggle the value

        # Update the specified task field in DynamoDB with the new value
        response = dynamodb.update_item(
            TableName='1059_Task',
            Key={'userId': {'S': user_id}},
            UpdateExpression=f'SET {task_name} = :new_value',
            ExpressionAttributeValues={':new_value': {'BOOL': new_value}}
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': f'{task_name} Updated'}),
             'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}

        }

    except KeyError as e:
        # Handle missing query parameters
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing query parameter: {str(e)}'})
        }
    except Exception as e:
        # Handle other errors
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }