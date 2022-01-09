use super::vec3::{Point3,Vec3,Color3};

#[derive(Copy, Clone)]
pub struct Ray {
  origin: Point3,
  direction: Vec3
}

impl Ray {
  pub fn new(origin: Point3, direction: Vec3) -> Ray {
    Ray{
      origin,
      direction
    }
  }

  pub fn origin(self) -> Point3 {
    self.origin
  }

  pub fn direction(self) -> Vec3 {
    self.direction
  }

  pub fn at(self, t: f64) -> Vec3 {
    &self.origin + &(&self.direction * t)
  }
}

#[macro_export]
macro_rules! ray {
  ( $o:expr, $d:expr ) => {{
    Ray::new($o, $d)
  }};
}