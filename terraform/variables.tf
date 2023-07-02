variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "access_key" {
  type        = string
  description = "AWS Access Key"
}

variable "env_variables" {
  type        = any
  description = "Container env variables"
}

variable "account_id" {
  type        = string
  description = "AWS Account ID"
}

variable "ecr_image" {
  type        = string
  description = "ECR Image"
}

variable "secret_key" {
  type        = string
  description = "AWS Secret Key"
}

variable "repository_name" {
  type        = string
  default     = "demo-app"
  description = "Repository Name"
}

variable "ecs_values" {
  type = any
  default = {
    cluster_name = "demo-app"
    service_name = "demo-app"
  }
  description = "AWS ECS configuration"
}
