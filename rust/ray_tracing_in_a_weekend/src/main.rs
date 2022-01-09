use rand::Rng;
use ray::*;
use std::fs::OpenOptions;
use std::io::Write;
use vec3::*;

mod ray;
mod vec3;
mod hittable;

fn save_img(width: u32, height: u32, data: &Vec<Color3>) {
    let mut file_data = format!("P3\n{} {}\n255", width, height);
    let width = width as usize;

    for i in 0..data.len() {
        if i % width == 0 {
            file_data.push_str("\n");
        }
        file_data.push_str(&data[i].write_color());
    }
    let mut f = OpenOptions::new()
        // .append(true)
        .write(true)
        .create(true)
        .truncate(true)
        .open("./img.ppm")
        .expect("Unable to open file");
    f.write_all(file_data.as_bytes())
        .expect("Unable to write data");
}

// fn hit_sphere(center: &Point3, radius: f64, r: &Ray) -> f64 {
//     let oc = r.origin() - center;
//     let a = r.direction().dot(&r.direction());
//     let b = oc.dot(&r.direction()) * 2.0;
//     let c = oc.dot(&oc) - radius * radius;
//     let discriminant = b * b - 4.0 * a * c;
//     if discriminant < 0.0 {
//         return -1.0;
//     } else {
//         return (-b - discriminant.sqrt()) / (2.0 * a);
//     }
// }

fn hit_sphere(center: &Point3, radius: f64, r: &Ray) -> f64 {
    let oc = r.origin() - center;
    let a = r.direction().length_squared();
    let half_b = oc.dot(&r.direction());
    let c = oc.length_squared() - radius*radius;
    let discriminant = half_b * half_b - a * c;
    if discriminant < 0.0 {
        return -1.0;
    } else {
        return (-half_b - discriminant.sqrt()) / a;
    }
}

fn ray_color(r: &Ray) -> Color3 {
    let t = hit_sphere(&point3!(0.0, 0.0, -1.0), 0.5, r);
    if t > 0.0 {
        let normal = (r.at(t) - vec3![0.0, 0.0, -1.0]).unit();
        return Color3::new(normal.x() + 1.0, normal.y() + 1.0, normal.z() + 1.0, 'c')*0.5;
    }
    let unit_direction = r.direction().unit();
    let t = 0.5 * (unit_direction.y() + 1.0);
    Color3::new(1.0, 1.0, 1.0, 'c') * (1.0 - t) + Color3::new(0.5, 0.7, 1.0, 'c') * t
}

fn main() {
    // Image
    let aspect_ratio = 16.0 / 9.0;
    let image_width: u32 = 400;
    let image_height = ((image_width as f32) / aspect_ratio) as u32;

    // Camera
    let viewport_height = 2.0;
    let viewport_width = aspect_ratio * viewport_height;
    let focal_length = 1.0;

    let origin = point3![0.0, 0.0, 0.0];
    let horizontal = vec3![viewport_width as f64, 0.0, 0.0];
    let vertical = vec3![0.0, viewport_height as f64, 0.0];
    let lower_left_corner =
        &origin - &horizontal / 2.0 - &vertical / 2.0 - vec3![0.0, 0.0, focal_length as f64];

    // Render
    let mut img_data = vec![];

    for j in 0..image_height {
        let j = image_height - j;
        for i in 0..image_width {
            let u = (i as f64) / ((image_width as f64) - 1.0);
            let v = (j as f64) / ((image_height as f64) - 1.0);
            let r = ray![
                origin.clone(),
                &lower_left_corner + &horizontal * u + &vertical * v - &origin
            ];
            img_data.push(ray_color(&r));
        }
    }

    save_img(image_width, image_height, &img_data);
}
