AFRAME.registerComponent("enemy-fireballs", {
    init: function () {
        setInterval(this.shootEnemyFireball, 2000)
    },
    shootEnemyFireball: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyFireball entity
            var enemyFireball = document.createElement("a-entity");

            enemyFireball.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyFireball.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyFireball.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyFireball);

            //Three.js Vector Variables
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()

            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D
            var enemyFireball = fireball.object3D;

            //Get enemey and player position using Three.js methods
            var direction = new THREE.Vector3()
            player.getWorldPosition(position1)
            enemy_fireball.getWorldPosition(position2)

            //set the velocity and it's direction
            direction.subVectors(position1, position2).normalize()
                enemyFireball.setAttribute("velocity", direction.multiplyScalar(10))
            
            //Set dynamic-body attribute
            enemyFireball.setAttribute("dynamic-body", {
                shape : "sphere",
                mass : "0"
            }) 

            //Get text attribute
            var element = document.querySelector("#countLife")
            var playerLife = parseInt(element.getAttribute("text").value)

            //collide event on enemy fireballs
            enemyFireball.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if (playerLife > 0) {
                        playerLife -= 1
                        element.setAttribute("text", {
                            value : playerLife
                        })
                    }
                    if (playerLife <= 0) {
                        var txt = document.querySelector("#over"); 
                            txt.setAttribute("visible", true); 
                        var enemyEl = document.querySelectorAll(".enemy") 
                            for (var i = 0; i < enemyEl.length; i++) 
                                { scene.removeChild(enemyEl[i]) }
                    }

                }
            });

        }
    },

});