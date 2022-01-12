use std::fmt;
use std::ops::{AddAssign, DivAssign, Index, IndexMut, MulAssign, SubAssign};
use std::ops;

#[derive(Copy, Clone)]
pub struct Vec3 {
  x: f64,
  y: f64,
  z: f64,
  name: char,
}

impl Vec3 {
  pub fn new(x: f64, y: f64, z: f64, name: char) -> Vec3 {
    Vec3 { x, y, z, name }
  }

  pub fn length_squared(self) -> f64 {
    self.x * self.x + self.y * self.y + self.z * self.z
  }

  pub fn length(self) -> f64 {
    self.length_squared().sqrt()
  }

  pub fn dot(self, other: &Vec3) -> f64 {
    self.x * other.x + self.y * other.y + self.z * other.z
  }

  pub fn cross(self, other: &Vec3) -> Vec3 {
    Vec3 {
      x: self.y * other.z - self.z * other.y,
      y: self.z * other.x - self.x * other.z,
      z: self.x * other.y - self.y * other.x,
      name: self.name,
    }
  }

  pub fn unit(self) -> Vec3 {
    &self / self.length()
  }

  pub fn x(self) -> f64 {
    self.x
  }

  pub fn y(self) -> f64 {
    self.y
  }

  pub fn z(self) -> f64 {
    self.z
  }
}

impl_op_ex!(+ |a: &Vec3, b: &Vec3| -> Vec3 { 
  Vec3 {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
    name: a.name,
  }
});

impl AddAssign<&Vec3> for Vec3 {
  fn add_assign(&mut self, other: &Vec3) {
    self.x += other.x;
    self.y += other.y;
    self.z += other.z;
  }
}

impl_op_ex!(- |a: &Vec3, b: &Vec3| -> Vec3 { 
  Vec3 {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
    name: a.name,
  }
});

impl SubAssign<&Vec3> for Vec3 {
  fn sub_assign(&mut self, other: &Vec3) {
    self.x -= other.x;
    self.y -= other.y;
    self.z -= other.z;
  }
}

impl_op_ex_commutative!(* |a: &Vec3, b: &f64| -> Vec3 { 
  Vec3 {
    x: a.x * b,
    y: a.y * b,
    z: a.z * b,
    name: a.name,
  }
});

impl_op_ex!(* |a: &Vec3, b: &Vec3| -> Vec3 { 
  Vec3 {
    x: a.x * b.x,
    y: a.y * b.y,
    z: a.z * b.z,
    name: a.name,
  }
});

impl MulAssign<f64> for Vec3 {
  fn mul_assign(&mut self, other: f64) {
    self.x *= other;
    self.y *= other;
    self.z *= other;
  }
}

impl MulAssign<&Vec3> for Vec3 {
  fn mul_assign(&mut self, other: &Vec3) {
    self.x *= other.x;
    self.y *= other.y;
    self.z *= other.z;
  }
}

impl_op_ex_commutative!(/ |a: &Vec3, b: &f64| -> Vec3 { 
  Vec3 {
    x: a.x * (1.0 / b),
    y: a.y * (1.0 / b),
    z: a.z * (1.0 / b),
    name: a.name,
  }
});

impl DivAssign<&Vec3> for Vec3 {
  fn div_assign(&mut self, other: &Vec3) {
    self.x /= other.x;
    self.y /= other.y;
    self.z /= other.z;
  }
}

impl Index<usize> for Vec3 {
  type Output = f64;

  fn index<'a>(&'a self, i: usize) -> &'a f64 {
    match i {
      0 => &self.x,
      1 => &self.y,
      2 => &self.z,
      _ => {
        panic!("Index {} out of bounds for Vec3", i)
      }
    }
  }
}

impl IndexMut<usize> for Vec3 {
  fn index_mut(&mut self, i: usize) -> &mut f64 {
    match i {
      0 => &mut self.x,
      1 => &mut self.y,
      2 => &mut self.z,
      _ => {
        panic!("Index {} out of bounds for Vec3", i)
      }
    }
  }
}

impl fmt::Display for Vec3 {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let name = match self.name {
      'p' => "Point3",
      'c' => "Color3",
      _ => "Vec3",
    };
    write!(f, "{}({}, {}, {})", name, self.x, self.y, self.z)
  }
}

#[macro_export]
macro_rules! vec3 {
  ( $x:expr, $y:expr, $z:expr ) => {{
    Vec3::new($x, $y, $z, 'v')
  }};
}

// Aliases
pub type Color3 = Vec3;
pub type Point3 = Vec3;

impl Color3 {
  pub fn write_color(self) -> String {
    let r = (self.x * 255.999) as u16;
    let g = (self.y * 255.999) as u16;
    let b = (self.z * 255.999) as u16;
    format!("{} {} {} ", r, g, b)
  }
}

#[macro_export]
macro_rules! color3 {
  ( $x:expr, $y:expr, $z:expr ) => {{
    Color3::new($x, $y, $z, 'c')
  }};
}

#[macro_export]
macro_rules! point3 {
  ( $x:expr, $y:expr, $z:expr ) => {{
    Point3::new($x, $y, $z, 'p')
  }};
}
