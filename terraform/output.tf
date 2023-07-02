output "aws_region" {
  value       = var.aws_region
  description = "The AWS region used"
}

output "app_url" {
  value       = aws_lb.alb.dns_name
  description = "The public ALB DNS"
}

output "ecs_cluster" {
  value       = aws_ecs_cluster.cluster.name
  description = "The ECS cluster name"
}

output "ecs_service" {
  value       = aws_ecs_service.service.name
  description = "The ECS service name"
}
