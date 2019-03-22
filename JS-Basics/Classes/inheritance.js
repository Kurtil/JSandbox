class C1 {
    log() {
        console.log("I am a C1");
    }
}

class C2 extends C1 {
    log() {
        // This works, but impossible to debug here ! => SyntaxError: 'super' keyword unexpected here
        super.log();
        console.log("And also a C2");
    }
}

const ob = new C2;

ob.log();