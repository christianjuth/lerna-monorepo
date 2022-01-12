use super::vec3::*;
use super::ray::*;

pub struct HitRecord {
  p: Point3,
  normal: Vec3,
  t: f64,
  front_face: bool,
}

impl HitRecord {
  fn set_front_face(&mut self, r: &Ray, outward_normal: &Vec3) {
    self.front_face = r.direction().dot(outward_normal) < 0.0;
    self.normal = if self.front_face { outward_normal.clone() } else { outward_normal.clone() * -1.0 };
  }
}

pub struct Hittable {
  center: Point3,
  radius: f64,
}

type Sphere = Hittable;

impl Sphere {
  fn hit(self, r: &Ray, t_min: f64, t_max: f64, hit_record: &mut HitRecord) -> bool {
    let oc = r.origin() - self.center;
    let a = r.direction().length_squared();
    let half_b = oc.dot(&r.direction());
    let c = &self.radius * &self.radius + -oc.length_squared();

    let discriminant = half_b * half_b - a * c;

    if discriminant < 0.0 {
      return false;
    }
    let sqrtd = discriminant.sqrt();

    let mut root = (-half_b - sqrtd) / a;
    if root < t_min || t_max < root {
      root = (-half_b + sqrtd) / a;
      if root < t_min || t_max < root {
        return false;
      }
    }

    hit_record.t = root;
    hit_record.p = r.at(hit_record.t);
    let outward_normal = (hit_record.p - self.center) / self.radius;
    hit_record.set_front_face(r, &outward_normal);

    true
  }
}