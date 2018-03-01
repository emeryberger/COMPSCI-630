#![feature(global_allocator, allocator_api, heap_api,libc,alloc)]
#![feature(const_fn)]
#![allow(dead_code)]
#![feature(core_usizerinsics)]
#![no_std]
#![feature(asm)]
#![feature(core_intrinsics)]
#![feature(use_extern_macros)]


//external crates you may need
extern crate libc;
extern crate alloc;
use core::ptr;

//import core printer for printing data
extern crate core_printer;

//use these printer functions
use core_printer::{print_int,print_u8,print_string};


//import allocator API 
use alloc::heap::{Alloc, AllocErr, Layout};

//Struct  to represent allocator
pub struct Cheap;


//this function takes various arguments and maps a page of memory, returns a ptr to said memory
unsafe fn mmap(addr: *mut libc::c_void, len: usize,
               fd: libc::c_int, offset: usize)->*mut u8{

    //implement Mmap here using nix crate function
    ptr::null_mut()
}





//implementing functions for evaluate struct
pub unsafe trait Evaluate{
    fn stats(&mut self);
}

//Functions to print stats for your memory allocator here.
unsafe impl Evaluate for Cheap{
     fn stats(&mut self){
         unsafe{
            //implement printing of memory stats here.
            print_string(b"Called Memory Stats!");
         }
    }
    
}





//functions for allocator api, do not modify
unsafe impl Alloc for Cheap {
    unsafe fn alloc(&mut self, layout: Layout) -> Result<*mut u8, AllocErr> {
        (&*self).alloc(layout)
    }

    unsafe fn dealloc(&mut self, ptr: *mut u8, layout: Layout) {
        (&*self).dealloc(ptr, layout)
    }
}


//Implement your memory allocator alloc and dealloc functions here
unsafe impl<'a> Alloc for &'a Cheap {


    unsafe fn alloc(&mut self, layout: Layout) -> Result<*mut u8, AllocErr> {
        
        // Implement alloc here

        //returning a null ptr.
        Ok(ptr::null_mut() as *mut u8)
        
        
        
    }

    unsafe fn dealloc(&mut self, ptr: *mut u8, layout: Layout) {
        //implement free here

    }
}