# kics-scan ignore
resource "aws_iam_role" "fargate" {
  name = "fargate-role"
  path = "/serviceaccounts/"
  tags = {
    Environment = "production"
  }
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = [
            "ecr.amazonaws.com",
            "ecs.amazonaws.com",
            "ecs-tasks.amazonaws.com"
          ]
        }
      },
    ]
  })
}

resource "aws_iam_role_policy" "fargate" {
  name = "fargate-execution-role"
  role = aws_iam_role.fargate.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": "ecr:*",
        "Resource": "arn:aws:ecr:${var.aws_region}:${var.account_id}:repository/${var.repository_name}"
      }
  ]
}
EOF
}
