#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { createContext } from "../lib/context";
import { AwsLambdaCicdExampleStack } from '../lib/main';

const app = new cdk.App();
const context = createContext(app.node.tryGetContext("env"));
new AwsLambdaCicdExampleStack(app, `AwsLambdaCicdExampleStack-${context.env}`, {
  path: 'lambda',
  handler: 'hello.handler',
  runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
  environmentValues: {
    NODE_ENV: context.env,
    URL: context.url
  }
});