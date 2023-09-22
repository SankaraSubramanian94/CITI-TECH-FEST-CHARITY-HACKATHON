import boto3
import json
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table_name = '1059_UserRegistrationTable'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)
item_table_name = '1059_Task'  # Replace with the name of your 'item' table
sns_client = boto3.client('sns')
sns_topic_arn = 'arn:aws:sns:us-east-1:417267928402:1059_mail_sns'


class ItemAlreadyExistsError(Exception):
    pass

def lambda_handler(event, context):
    # Extract user attributes from the Cognito event
    user_email = event['request']['userAttributes']['email']
    user_id = event['userName']
    user_attributes = event['request']['userAttributes']
    
    # Check if userID exists in the 'UserRegistrationTable'
    try:
        # Scan the 'UserRegistrationTable' to check if the email exists
        user_table = dynamodb.Table(table_name)
        response = user_table.scan(
            FilterExpression=Attr('email').eq(user_email)
        )

        # Check if the item exists in 'UserRegistrationTable'
        if len(response['Items']) == 0:
            # Item doesn't exist, create a new one
            item = {
                'userId': user_id,
                'given_name': user_attributes.get('given_name', ''),
                'family_name': user_attributes.get('family_name', ''),
                'preferred_username': user_attributes.get('preferred_username', ''),
                'email': user_attributes.get('email', ''),
                'gender': user_attributes.get('gender', ''),
                'birthdate': user_attributes.get('birthdate', ''),
                'phone_number': user_attributes.get('phone_number', ''),
                'address': user_attributes.get('address', ''),
                'has_voted': False
            }
            # Store the item in 'UserRegistrationTable'
            user_table.put_item(Item=item)
            print("New item created in 'UserRegistrationTable':", item)
            create_email_subscription(user_email)
        else:
            # Item exists in 'UserRegistrationTable'
            print("Item already exists in 'UserRegistrationTable':", response['Items'][0])
            raise ItemAlreadyExistsError("Item already exists in UserRegistrationTable")

    except ItemAlreadyExistsError as e:
        print("Item already exists in 'UserRegistrationTable'")
        # Return an error response for 'UserRegistrationTable'
        return {
            "errorType": "CustomError",
            "errorMessage": "Item already exists in UserRegistrationTable."
        }
    except Exception as e:
        print("Error:", e)
        # Return an error response for 'UserRegistrationTable'
        return {
            "errorType": "CustomError",
            "errorMessage": "Error while adding entry in UserRegistrationTable table."
        }

    # Check if userID exists in the 'item' table
    try:
        # Get the item from the 'item' table
        item_table = dynamodb.Table(item_table_name)
        response = item_table.get_item(
            Key={
                'userId': user_id  # Ensure the case and data type match the table schema
            }
        )

        # Check if the item exists in 'item' table
        if 'Item' not in response:
            # Item doesn't exist, create a new one
            new_item = {
                'userId': user_id,
                'learnAboutCandidates': False,
                'findPollingStation': False,
                'registerToVote': False
                # Add more fields as needed
            }
            # Store the item in 'item' table
            item_table.put_item(Item=new_item)
            print("New item created in 'Task' table:", new_item)
        else:
            # Item exists in 'item' table
            print("Item already exists in 'Task' table:", response['Item'])
            raise ItemAlreadyExistsError("Item already exists in Task")

    except ItemAlreadyExistsError as e:
        print("Item already exists in 'Task' table")
        # Return an error response for 'item' table
        return {
            "errorType": "CustomError",
            "errorMessage": "Item already exists in Task table."
        }
    except Exception as e:
        print("Error:", e)
        # Return an error response for 'item' table
        return {
            "errorType": "CustomError",
            "errorMessage": "Error while adding entry in Task table."
        }

    # Return a response
    event['response']['autoConfirmUser'] = False
    
    return event
    

def create_email_subscription(user_email):
    try:
        # Check if the subscription already exists
        existing_subscriptions = sns_client.list_subscriptions_by_topic(TopicArn=sns_topic_arn)
        subscription_exists = False

        for subscription in existing_subscriptions['Subscriptions']:
            if subscription['Protocol'] == 'email' and subscription['Endpoint'] == user_email:
                print(f'Subscription for {user_email} already exists')
                subscription_exists = True
                break

        if not subscription_exists:
            # Create a new email subscription for the user's email
            sns_client.subscribe(
                TopicArn=sns_topic_arn,
                Protocol='email',
                Endpoint=user_email
            )
            print(f'New email subscription created for {user_email}')

            # Send a confirmation message to the user
            send_confirmation_message(user_email)

    except Exception as sns_error:
        # Log any subscription creation errors
        sns_error_message = f'Error creating email subscription for {user_email}: {str(sns_error)}'
        print(sns_error_message)

def send_confirmation_message(user_email):
    try:
        # Customize the confirmation message
        confirmation_message = (
            f"To receive important updates related to the election, please click the link below to confirm your subscription:\n"
            f"Confirmation Link below:\n"
        )

        # Send the confirmation message
        sns_client.publish(
            TopicArn=sns_topic_arn,
            Message=confirmation_message,
            Subject="Confirm Your Subscription"
        )
        print(f'Confirmation message sent to {user_email}')

    except Exception as sns_error:
        # Log any message sending errors
        sns_error_message = f'Error sending confirmation message to {user_email}: {str(sns_error)}'
        print(sns_error_message)
