import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const bucket = new aws.s3.Bucket("bacaxnot.assets");

export const bucketId = bucket.id;
export const bucketArn = bucket.arn;
export const bucketEndpoint = pulumi.interpolate`https://${bucket.bucketDomainName}`;

const ownershipControls = new aws.s3.BucketOwnershipControls(
  "ownership-controls",
  {
    bucket: bucket.id,
    rule: {
      objectOwnership: "ObjectWriter",
    },
  }
);

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
  "public-access-block",
  {
    bucket: bucket.id,
    blockPublicAcls: false,
  }
);

const errorImage = new aws.s3.BucketObject(
  "_error-post.png",
  {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset("./_error-post.png"),
    contentType: "image/png",
    acl: "public-read",
  },
  { dependsOn: [publicAccessBlock, ownershipControls] }
);
