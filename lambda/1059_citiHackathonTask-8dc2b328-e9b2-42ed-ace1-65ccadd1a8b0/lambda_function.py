import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
  userId = event['queryStringParameters']['userId']
  print('User Id is:', userId)
  data = client.get_item(
    TableName='1059_Task',
    Key={
        'userId': {
          'S': userId
        }
    }
  )

  response_item = data.get('Item',{})
  response = {
        'registerToVote': response_item.get('registerToVote', {}).get('BOOL'),
        'learnAboutCandidates': response_item.get('learnAboutCandidates', {}).get('BOOL'),
        'findPollingStation': response_item.get('findPollingStation', {}).get('BOOL')
    }
  # Convert the boolean values to lowercase strings
  response_final = {}
  for key, value in response.items():
    response_final[key] = value
  
  return {
            'statusCode': 200,
            'body': json.dumps(response_final),
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
          }