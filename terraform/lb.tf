# kics-scan ignore
resource "aws_lb" "alb" {
  name                       = "demo-app-load-balancer"
  internal                   = false
  load_balancer_type         = "application"
  subnets                    = [for s in data.aws_subnet.subnets : s.id]
  drop_invalid_header_fields = true
  enable_deletion_protection = false
  tags = {
    Environment = "production"
  }
}

resource "aws_wafregional_web_acl" "demo" {
  name        = "demo"
  metric_name = "demo"

  default_action {
    type = "ALLOW"
  }
  tags = {
    Environment = "production"
  }
}

resource "aws_wafregional_web_acl_association" "waf33" {
  resource_arn = aws_lb.alb.arn
  web_acl_id   = aws_wafregional_web_acl.demo.id
}

resource "aws_lb_target_group" "group" {
  name        = "demo-app-lb-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.vpc.id
  target_type = "ip"
  tags = {
    Environment = "production"
  }

  depends_on = [aws_lb.alb]
}

resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.group.arn
  }
}
