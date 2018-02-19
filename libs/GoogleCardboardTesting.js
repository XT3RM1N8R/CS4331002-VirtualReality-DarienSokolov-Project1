
    this.lastSensorX = 0; // from https://stackoverflow.com/questions/40270350/detect-google-cardboard-magnetic-button-click-in-javascript/40918638#40918638

try {
  this.sensor = new Magnetometer();
  if (this.sensor!==undefined) {
       this.sensor.start();
  }
} catch(err) {
            console.log("Magnetometer not supported. Make sure you configure chrome://flags/#enable-generic-sensor-extra-classes and deliver via HTTPS.");
}


// Check major differences on Magnetometer and identify this as a button-click

if (this.sensor !== undefined) {
  this.sensor.onreading = () => {
     var delta= this.sensor.x-this.lastSensorX;
      
     if (delta > 100 ) {
           // do whatever you want to do, in case the cardboard magnet has been "clicked"
     }
     this.lastSensorX = this.sensor.x;
  }
  
  this.sensor.onerror = event => console.log(event.error.name + " (Magnetometer): ", event.error.message);

}

    AFRAME.registerComponent("start-click", { // from https://glitch.com/edit/#!/a-frame-cardboard-move?path=index.html:2:6
        init: function() {
            const sceneEl = this.el.sceneEl
            const canvasEl = sceneEl.canvas
            const camera = document.querySelector('a-camera')
            this.isMoving = false
            this.position = {x: 0, y: 20, z: 80}

            canvasEl.addEventListener('touchstart', () => {
                this.isMoving = true
            })

            canvasEl.addEventListener('touchend', () => {
                this.isMoving = false
            })
        },
        tick: function () {
          if (this.isMoving) {
            this.position.z -= 1
            camera.setAttribute('position', this.position)
          }
        }
    });