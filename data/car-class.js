class Car{
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(brand, model){
    this.brand = brand;
    this.model = model;
  }

  displayInfo(){
    console.log(`Brand : ${this.brand}   Model: ${this.model}   Speed: ${this.speed}  Trunk: ${this.isTrunkOpen ? "Open" : "Closed"}`);
  }

  go(){
    if(this.speed<=200 && this.isTrunkOpen == false){
     this.speed+=5;
    }else{
      console.log("Your car Trunk is Open,Please Close it first")
    }  
  }
  brake(){
    if(this.speed>=0) this.speed-=5;
  }

  openTrunk(){
    if(this.speed == 0){
      this.isTrunkOpen = true;
    }else{
      console.log("You cannot open Trunk while the car is moving");
      //Okay so this feel same as to Hack and Overwrite some functioning like in movies : )
    }
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Tesla", "Model 3");

car1.isTrunkOpen = false;
car1.go();
car1.go();
car1.go();
car1.go();


car1.displayInfo();
car2.displayInfo();


class RaceCar extends Car{
  acceleration;
  constructor(brand,model,acceleration){
    super(brand,model);
    this.acceleration = acceleration;
  }

  go(){
    if(this.speed<=300){
     this.speed+=this.acceleration;
    }
  }

  displayInfo(){
    console.log(`Brand : ${this.brand}   Model: ${this.model}   Speed: ${this.acceleration}`);
  }

  openTrunk(){
    console.log("Race Cars don't have such things");
  }
  closeTrunk(){
    console.log("Race Cars don't have such things");
  }
}

const supra = new RaceCar('Toyota','Supra',50)

supra.displayInfo();