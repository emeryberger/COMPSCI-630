//enable global allocator feature
#![feature(global_allocator)]
#![feature(core_intrinsics)]
#![feature(alloc)]
#![feature(allocator_api)]
#![feature(alloc, heap_api)]
#![feature(use_extern_macros)]
#![allow(dead_code)]


// import allocator
extern crate cheap;

// Use Cheap from allocator
use cheap::Cheap;

//use evaluate trait for printing stats
use cheap::Evaluate;


//applying allocator to global
#[global_allocator]

//Set the allocator
static GLOBAL: Cheap = Cheap;


fn main() {
    //make memory calls here to test your allocator


    //use this to print stats from your memory allocator.
    Cheap::stats(&mut Cheap);
    
}
