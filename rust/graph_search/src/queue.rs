pub struct Queue<'a, T: ?Sized> {
  items: Vec<&'a T>
}

pub fn create<'a, T: ?Sized>() -> Queue<'a, T> {
  Queue{
    items: vec![]
  }
}

pub fn enqueue<'a, T: ?Sized>(queue: &mut Queue<'a, T>, item: &'a T) {
  queue.items.push(item);
}

pub fn dequeue<'a, T: ?Sized>(queue: &mut Queue<'a, T>) -> Option<&'a T> {
  Some(queue.items.remove(0))
}

pub fn size<T: ?Sized>(queue: &Queue<T>) -> usize {
  queue.items.len()
}