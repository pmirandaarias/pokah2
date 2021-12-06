import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  console.log('event', event);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  try {
    const response = await dynamoDb.delete(params);
    console.log('response', response);
    return { status: true };
  } catch (e) {
    console.log('e', e);
    return {
      error: e.message || 'unknown',
      status: false,
      statusCode: e.statusCode || 500
    };
  }
});
