import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal
import uuid

# Define the DynamoDB table that Lambda will connect to
tableName = "1059_UserRegistrationTable"

# Create the DynamoDB resource
dynamo = boto3.resource('dynamodb').Table(tableName)

print('Loading function')

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    '''Provide an event that contains the following keys:

      - operation: one of the operations in the operations dict below
      - payload: a JSON object containing parameters to pass to the 
                 operation being performed
    '''
    
    # Define the functions used to perform the CRUD operations
    http_method = event['httpMethod']
    resource_path = event['resource']
    
    if resource_path == '/user':
        # Handle requests to /users path here
        if http_method == 'GET':
            return get_user(event)
        elif http_method == 'POST':
            return create_user(event)
        elif http_method == 'PUT':
            return update_user(event)
        elif http_method == 'DELETE':
            return delete_user(event)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps('Method not allowed')
        }

def get_user(event):
    query_parameters = event.get('queryStringParameters')
    
    if query_parameters is None or 'userId' not in query_parameters:
        # If userId is not provided, return all items
        try:
            response = dynamo.scan()
            items = response.get('Items')
            if items:
                return {
                    'statusCode': 200,
                    'body': json.dumps(items, cls=DecimalEncoder)  # Serialize Decimal using the custom encoder
                }
            else:
                return {
                    'statusCode': 404,
                    'body': json.dumps('No items found')
                }
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': json.dumps('Internal Server Error')
            }
    else:
        # If userId is provided, retrieve the specific item
        user_id = query_parameters['userId']
        print(type(user_id))
        print(user_id)
        try:
            response = dynamo.get_item(Key={'userId': user_id})
            item = response.get('Item')
            if item:
                return {
                    'statusCode': 200,
                    'body': json.dumps(item, cls=DecimalEncoder)  # Serialize Decimal using the custom encoder
                }
            else:
                return {
                    'statusCode': 404,
                    'body': json.dumps('Item not found')
                }
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': json.dumps('Internal Server Error')
            }


def create_user(event):
    try:
        body = json.loads(event['body'], parse_float=Decimal)
        
        # Generate a new userId (e.g., UUID)
        new_user_id = str(uuid.uuid4())
        
        # Add the generated userId to the body
        body['userId'] = new_user_id

        # Insert the item into DynamoDB
        dynamo.put_item(Item=body)
        return {
            'statusCode': 201,
            'body': json.dumps('Item created successfully')
        }
    except ValueError:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid JSON')
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Internal Server Error')
        }

def update_user(event):
    user_id = event['queryStringParameters'].get('userId')
    if not user_id:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing userId query parameter')
        }
    
    try:
        body = json.loads(event['body'], parse_float=Decimal)
        response = dynamo.update_item(
            Key={'userId': user_id},
            UpdateExpression='SET #attrName = :attrValue',
            ExpressionAttributeNames={'#attrName': 'userDetails'},  # Update with the actual attribute name
            ExpressionAttributeValues={':attrValue': body['userDetails']}  # Update with the actual attribute value
        )
        return {
            'statusCode': 200,
            'body': json.dumps('Item updated successfully')
        }
    except ValueError:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid JSON')
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Internal Server Error')
        }

def delete_user(event):
    user_id = event['queryStringParameters'].get('userId')
    if not user_id:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing userId query parameter')
        }
    
    try:
        dynamo.delete_item(Key={'userId': user_id})
        return {
            'statusCode': 200,
            'body': json.dumps('Item deleted successfully')
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Internal Server Error')
        }
