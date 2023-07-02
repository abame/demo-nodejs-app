output "aws_region" {
  value       = var.aws_region
  description = "The AWS region used"
}

output "ecr_url" {
  value       = aws_ecr_repository.repository.repository_url
  description = "The ECR repository URL"
}

output "ecr_repository_name" {
  value       = aws_ecr_repository.repository.name
  description = "The ECR repository name"
}