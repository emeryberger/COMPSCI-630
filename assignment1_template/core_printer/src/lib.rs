extern crate core;
use core::fmt::{self, Write};


extern crate libc;

///////WRITER ----------
struct Wrapper<'a> {
    buf: &'a mut [u8],
    offset: usize,
}

impl<'a> Wrapper<'a> {
    fn new(buf: &'a mut [u8]) -> Self {
        Wrapper {
            buf: buf,
            offset: 0,
        }
    }
}

impl<'a> fmt::Write for Wrapper<'a> {
    fn write_str(&mut self, s: &str) -> fmt::Result {
        let bytes = s.as_bytes();

        // Skip over already-copied data
        let remainder = &mut self.buf[self.offset..];
        // Make the two slices the same length
        let remainder = &mut remainder[..bytes.len()];
        // Copy
        remainder.copy_from_slice(bytes);

        Ok(())
    }
}
/////// ------------- End Writer ---- ---------




pub unsafe fn print_string(data: &[u8])
{
    libc::write(1,  data.as_ptr() as *const libc::c_void,  data.len());
}

pub unsafe  fn print_int(data: usize){
    
    let mut buf = [0 as u8; 20];
    write!(Wrapper::new(&mut buf), "{}", data).expect("Can't write");
    libc::write(1,  buf.as_ptr() as *const libc::c_void,  buf.len());
    libc::write(1,  "\n".as_bytes().as_ptr() as *const libc::c_void,  "\n".as_bytes().len());
}

pub unsafe  fn print_u8(data: *mut u8){
    
    let mut buf = [0 as u8; 20];
    write!(Wrapper::new(&mut buf), "{:?}", data).expect("Can't write");
    libc::write(1,  buf.as_ptr() as *const libc::c_void,  buf.len());
    libc::write(1,  "\n".as_bytes().as_ptr() as *const libc::c_void,  "\n".as_bytes().len());
}
