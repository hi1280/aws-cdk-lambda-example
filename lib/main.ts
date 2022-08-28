import { aws_lambda, Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface LambdaFunctionConfig {
  path: string,
  handler: string,
  runtime: aws_lambda.Runtime,
  environmentValues: {
    NODE_ENV: string,
    URL: string
  }
};

export class AwsLambdaCicdExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaFunctionConfig) {
    super(scope, id);

    new aws_lambda.Function(this, `HelloFunction`, {
      functionName: `hello-function-${props.environmentValues.NODE_ENV}`,
      runtime: props.runtime,
      code: aws_lambda.Code.fromAsset(props.path),
      handler: props.handler,
      timeout: Duration.minutes(15),
      environment: props.environmentValues
    });
  }
}