use std::fmt;
use std::ops::{Add, AddAssign, Div, DivAssign, Index, IndexMut, Mul, MulAssign, Sub, SubAssign};

#[derive(Copy, Clone)]
pub struct Vec3 {
  pub x: f64,
  pub y: f64,
  pub z: f64,
  pub name: char
}

impl Vec3 {
  pub fn length_squared(self) -> f64 {
    self.x * self.x + self.y * self.y + self.z + self.z
  }

  pub fn length(self) -> f64 {
    self.length_squared().sqrt()
  }

  pub fn dot(self, other: &Vec3) -> f64 {
    self.x*other.x + self.y*other.y + self.z*other.z
  }

  pub fn cross(self, other: &Vec3) -> Vec3 {
    Vec3{
      x: self.y*other.z - self.z*other.y,
      y: self.z*other.x - self.x*other.z,
      z: self.x*other.y - self.y*other.x,
      name: self.name
    }
  }

  pub fn unit(self) -> Vec3 {
    &self / self.length()
  }
}

impl Add<&Vec3> for &Vec3 {
  type Output = Vec3;

  fn add(self, other: &Vec3) -> Vec3 {
    Vec3 {
      x: self.x + other.x,
      y: self.y + other.y,
      z: self.z + other.z,
      name: self.name
    }
  }
}

impl AddAssign<&Vec3> for Vec3 {
  fn add_assign(&mut self, other: &Vec3) {
    self.x += other.x;
    self.y += other.y;
    self.z += other.z;
  }
}

impl Sub<&Vec3> for &Vec3 {
  type Output = Vec3;

  fn sub(self, other: &Vec3) -> Vec3 {
    Vec3 {
      x: self.x - other.x,
      y: self.y - other.y,
      z: self.z - other.z,
      name: self.name
    }
  }
}

impl SubAssign<&Vec3> for Vec3 {
  fn sub_assign(&mut self, other: &Vec3) {
    self.x -= other.x;
    self.y -= other.y;
    self.z -= other.z;
  }
}

impl Mul<f64> for Vec3 {
  type Output = Vec3;

  fn mul(self, other: f64) -> Vec3 {
    Vec3 {
      x: self.x * other,
      y: self.y * other,
      z: self.z * other,
      name: self.name
    }
  }
}

impl Mul<&Vec3> for &Vec3 {
  type Output = Vec3;

  fn mul(self, other: &Vec3) -> Vec3 {
    Vec3 {
      x: self.x * other.x,
      y: self.y * other.y,
      z: self.z * other.z,
      name: self.name
    }
  }
}

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

impl Div<f64> for &Vec3 {
  type Output = Vec3;

  fn div(self, other: f64) -> Vec3 {
    Vec3 {
      x: self.x * (1.0 / other),
      y: self.y * (1.0 / other),
      z: self.z * (1.0 / other),
      name: self.name
    }
  }
}

impl DivAssign<f64> for Vec3 {
  fn div_assign(&mut self, other: f64) {
    self.x /= other;
    self.y /= other;
    self.z /= other;
  }
}

impl Div<&Vec3> for &Vec3 {
  type Output = Vec3;

  fn div(self, other: &Vec3) -> Vec3 {
    Vec3 {
      x: self.x * (1.0 / other.x),
      y: self.y * (1.0 / other.y),
      z: self.z * (1.0 / other.z),
      name: self.name
    }
  }
}

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
      _ => "Vec3"
    };
    write!(f, "{}({}, {}, {})", name, self.x, self.y, self.z)
  }
}

#[macro_export]
macro_rules! vec3 {
    ( $x:expr, $y:expr, $z:expr ) => {
        {
            Vec3{
              x: $x,
              y: $y,
              z: $z,
              name: 'v'
            }
        }
    };
}

// Aliases
pub type Color3 = Vec3;
pub type Point3 = Vec3;

#[macro_export]
macro_rules! color3 {
    ( $x:expr, $y:expr, $z:expr ) => {
        {
            Color3{
              x: $x,
              y: $y,
              z: $z,
              name: 'c'
            }
        }
    };
}

#[macro_export]
macro_rules! point3 {
    ( $x:expr, $y:expr, $z:expr ) => {
        {
            Point3{
              x: $x,
              y: $y,
              z: $z,
              name: 'p'
            }
        }
    };
}