#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsLambdaCicdExampleStack } from '../lib/main';

export interface Context {
  readonly env: string;
  readonly url: string;
}

const app = new cdk.App();
const env = app.node.tryGetContext("env");
const context = app.node.tryGetContext(env) as Context;
new AwsLambdaCicdExampleStack(app, `AwsLambdaCicdExampleStack-${context.env}`, {
  path: 'lambda/hello.ts',
  handler: 'lambdaHandler',
  runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
  environmentValues: {
    NODE_ENV: context.env,
    URL: context.url
  }
});