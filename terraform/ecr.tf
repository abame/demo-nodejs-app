resource "aws_ecr_repository" "repository" {
  name                 = var.repository_name
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Environment = "production"
  }
  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = aws_kms_key.key.key_id
  }
}

resource "aws_kms_key" "key" {
  description         = "Demo App key"
  enable_key_rotation = true
  policy              = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement":[
      {
        "Sid":"ECREncryptionKey",
        "Effect":"Deny",
        "Principal": {"AWS": [
          "arn:aws:iam::${var.account_id}:user/CMKUser"
        ]},
        "Action": [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ],
        "Resource":"*"
      }
    ]
  }
  POLICY
  tags = {
    Environment = "production"
  }
}

resource "aws_ecr_repository_policy" "policy" {
  repository = aws_ecr_repository.repository.name
  policy     = <<EOF
  {
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "adds full ecr access to the ${var.repository_name} repository",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::${var.account_id}:root"
        },
        "Action": [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetLifecyclePolicy",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
      }
    ]
  }
  EOF
}
