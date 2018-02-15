class DoublePendulum {

  constructor (gravity=1, startLocationVector=createVector(0,0), p1Length=250, p1Mass=1, p1Angle=PI+0.001, p2Length=300, p2Mass=1, p2Angle=PI) {

    // global gravity
    this.g = gravity;

    // 0 denotes the root of the pendulum, the static starting point.
    this.x0 = startLocationVector.x;
    this.y0 = startLocationVector.y;

    // p1 denotes the first pendulum
    this.p1 = {
      "a":0.0,    // acceleration
      "v":0.0,    // velocity
      "t":0.0,    // Angle theta
      "x":0.0,    // x coord
      "y":0.0,    // y coord
      "l":0.0,    // length
      "m":0.0     // Pendulum Mass
    };
    this.p1.t = float(p1Angle);
    this.p1.l = float(p1Length);
    this.p1.m = float(p1Mass);
    this.p1.x = this.X(this.x0, this.p1.t, this.p1.l);
    this.p1.y = this.Y(this.y0, this.p1.t, this.p1.l);

    // 2 denotes the second pendulum
    this.p2 = {
      "a":0.0,    // acceleration
      "v":0.0,    // velocity
      "t":0.0,    // Angle theta
      "x":0.0,    // x coord
      "y":0.0,    // y coord
      "l":0.0,    // length
      "m":0.0     // Pendulum Mass
    };
    this.p2.t = float(p2Angle);
    this.p2.l = float(p2Length);
    this.p2.m = float(p2Mass);
    this.p2.x = this.X(this.p1.x, this.p2.t, this.p2.l);
    this.p2.y = this.Y(this.p1.y, this.p2.t, this.p2.l);

  }


  // Helper functions for quickly finding the X and Y coords of the moving pendulum based on theta
  X (fixed_x, angle, length) {
    return float(fixed_x + (length * sin(angle)));
  }
  Y (fixed_y, angle, length) {
    return float(fixed_y + (length * cos(angle)));
  }


  update () {

    ////// Calculate Accel
    // Global Accel Variables (Is it faster to do the calculation multieple times or create a local var??)
    let t_diff = this.p1.t - this.p2.t
    let t_double_diff = 2*this.p1.t-2*this.p2.t;
    let p1_v_sq = this.p1.v * this.p1.v;
    let p2_v_sq = this.p2.v * this.p2.v;
    let m_total = this.p1.m + this.p2.m;

    // print(this.p1, this.p2)

    // Variables for P1 Acceleration
    let a = -(this.g*(2*this.p1.m+this.p2.m)*sin(this.p1.t))
    let b = -(this.p2.m*this.g*sin(this.p1.t-2*this.p2.t))
    let c = -(2*sin(t_diff)*this.p2.m*(p2_v_sq*this.p2.l+p1_v_sq*this.p1.l*cos(t_diff)))
    let d = this.p1.l*(2*this.p1.m+this.p2.m-this.p2.m*cos(t_double_diff))
    // Variables for P2 Acceleration
    let e = 2*sin(t_diff)*(p1_v_sq*this.p1.l*(m_total)+this.g*(m_total)*cos(this.p1.t)+p2_v_sq*this.p2.l*this.p2.m*cos(t_diff))
    let f = this.p2.l*(2*this.p1.m+this.p2.m-this.p2.m*cos(t_double_diff))
    // print(a,b,c,d,e,f)

    // Combind Above Variables and evaluate Accel equasions
    this.p1.a = (a+b+c)/d
    this.p2.a = e/f


    ////// Add Accel to Vel, and Vel to theta
    this.p1.v += this.p1.a;
    this.p2.v += this.p2.a;
    // Add 0.2% drag to prevent infinite movement of the pendulums
    this.p1.v = this.p1.v * 0.992;
    this.p2.v = this.p2.v * 0.992;
    this.p1.t += this.p1.v;
    this.p2.t += this.p2.v;

    ////// Update Locations
    this.p1.x = this.X(this.x0, this.p1.t, this.p1.l);
    this.p1.y = this.Y(this.y0, this.p1.t, this.p1.l);
    this.p2.x = this.X(this.p1.x, this.p2.t, this.p2.l);
    this.p2.y = this.Y(this.p1.y, this.p2.t, this.p2.l);
  }



  draw () {

    // Draw Lines
    stroke(255);
    strokeWeight(0.08);
    line(this.x0, this.y0, this.p1.x, this.p1.y);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    // Draw Pendulum root
    stroke(255,0,0);
    strokeWeight(2);
    point(this.x0, this.y0);

    // Draw Double Pendulum
    stroke(0,0,255);
    point(this.p1.x, this.p1.y);
    stroke(0,255,0);
    point(this.p2.x, this.p2.y);



  }








}
