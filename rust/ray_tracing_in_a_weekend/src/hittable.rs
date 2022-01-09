use super::vec3::*;
use super::ray::*;

pub struct Hittable {
  center: Point3,
  radius: Vec3,
  t: f64,
}

type Sphere = Hittable;

impl Sphere {
  // fn hit(self, r: &Ray, t_min: f64, t_max: f64, hit_record: &Hittable) -> bool {
  //   let oc = r.origin() - self.center;
  //   let a = r.direction().length_squared();
  //   let half_b = oc.dot(&r.direction());
  //   // let c = &self.radius * &self.radius + -oc.length_squared();
  //   let discriminant = half_b * half_b - a * c;
  //   if discriminant < 0.0 {
  //       return -1.0;
  //   } else {
  //       return (-half_b - discriminant.sqrt()) / a;
  //   }
  // }
}