var scene, camera, renderer, cube;
 
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    /* renderer.setViewport( vpXmin, vpYmin, vpXwidth, vpYheight ); Unused */
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    console.log(keyCode);
    if (keyCode == 87){ 
        scene.remove(robot);
        robot = gen_robot();
        scene.add(robot);
        waveAnimation();
    }
    else if(keyCode == 80 ){
        scene.remove(robot);
        robot = gen_robot();
        scene.add(robot);
        poliquineloAnimation();
    }
    else if(keyCode == 84 ){
        scene.remove(robot);
        robot = gen_robot();
        scene.add(robot);
        taekwondoKick();
    }
    //waveAnimation();
    //poliquineloAnimation();
    //taekwondoKick();
};


function gen_robot() {
    // Creating Group (not necessary, but better readability)
    var robot = new THREE.Group();

    // torso
    var torso = gen_rect(4, 6);
    torso.name = "torso";

    // head
    var head = gen_circle(1.6);
    head.name = "head";
    head.position.y = 4.8;
    head.position.z = -0.05;  // Not necessary, makes head not in front of other robot parts

    // left: upper arm, arm, hand
    var left_upper_arm = gen_rect(1.5, 4);
    left_upper_arm.name = "left_upper_arm";
    
    var left_lower_arm = gen_rect(1, 3);
    left_lower_arm.name = "lower_arm";
    
    var left_hand = gen_rect(1.5,0.5);
    left_hand.name = "hand";
    left_upper_arm.add(left_lower_arm);
    left_lower_arm.add(left_hand);
    left_hand.position.y = -1.5;
    left_lower_arm.position.y = -3;
    left_upper_arm.position.x = -2.6;

    // right: upper arm, arm, hand
    var right_upper_arm = left_upper_arm.clone();  
    right_upper_arm.name = "right_upper_arm";
    right_upper_arm.position.x = 2.6;

    // left: upper leg, leg, foot
    var left_upper_leg = gen_rect(1.5, 3);
    left_upper_leg.name = "left_upper_leg";
    
    var left_lower_leg = gen_rect(1.5, 3);
    left_lower_leg.name = "left_lower_leg";

    var left_foot = gen_rect(1.7,0.5);
    left_foot.name = "left_foot";

    left_lower_leg.add(left_foot);
    left_upper_leg.add(left_lower_leg);

    left_foot.position.y = -1.8;  
    left_lower_leg.position.y = -3.1;
    left_upper_leg.position.x = 1.2;
    left_upper_leg.position.y = - 4.5;

    // right: upper leg, leg, foot
    var right_upper_leg = left_upper_leg.clone();
    right_upper_leg.name = "right_upper_leg";
    right_upper_leg.position.x = -1.2;
    
    // Creating hieararchy
    robot.add(torso);
    torso.add(right_upper_arm);
    torso.add(head);
    torso.add(left_upper_arm);
    // TO DO: add remaining robot parts hierarchical relations
    torso.add(left_upper_leg);
    torso.add(right_upper_leg);


    robot.name = "robot";

    return robot
}


// Auxiliary function to generate rectangle
function gen_rect( width, height ) {
    var plane_geometry = new THREE.PlaneGeometry( width, height );
    var plane_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh(plane_geometry, plane_material);

    return plane;
}

// Auxiliary function to generate circle
function gen_circle( radius, segs = 30 ) {
    var circle_geometry = new THREE.CircleGeometry( radius, segs);
    var circle_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
    var circle = new THREE.Mesh(circle_geometry, circle_material);

    return circle
}

// Auxiliary function to generate triangle
function gen_triangle( size, v1 = new THREE.Vector3(-1, 0, 0), v2 = new THREE.Vector3(1, 0, 0), v3 = new THREE.Vector3(-1, 1, 0) ) {
    var triangle_geometry = new THREE.Geometry();
    var triangle = new THREE.Triangle(v1, v2, v3);
    var normal = triangle.normal();
    triangle_geometry.vertices.push(triangle.a);
    triangle_geometry.vertices.push(triangle.b);
    triangle_geometry.vertices.push(triangle.c);
    triangle_geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    var triangle = new THREE.Mesh(triangle_geometry, new THREE.MeshNormalMaterial());
    
    triangle.size = size;

    return triangle;
}


function waveAnimation(){
    var rot_pt;
    var right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
    rot_pt = new THREE.Vector3
        (
            (( right_upper_arm.geometry.parameters.width + right_upper_arm.position.x) / 2)+1.5,
            ( right_upper_arm.geometry.parameters.height + right_upper_arm.position.y) / 2.25,
            0
        );
    var rightUpperArmInitialPosition = right_upper_arm.position;
    
  
    var right_lower_arm = ( (robot.getObjectByName("right_upper_arm")).getObjectByName("lower_arm") );
    var rot_pt1 = new THREE.Vector3
        (
            (( 0) / 2)+1,
            (( right_lower_arm.position.y  ) / 1.6),
            0
    ); 
    var rightLowerArmInitialPosition = right_lower_arm.position;
  
      createjs.Tween.get(right_upper_arm.rotation, { loop: false }).to({ z: Math.PI/2 }, 500, createjs.Ease.getPowInOut(0.7)).wait(2000).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
      createjs.Tween.get(right_upper_arm.position, { loop: false }).to(rot_pt, 500, createjs.Ease.getPowInOut(0.7)).wait(2000).to(rightUpperArmInitialPosition, 500, createjs.Ease.getPowInOut(0.7));
      createjs.Tween.get(right_lower_arm.rotation, { loop: false }).wait(500).to({ z: Math.PI/2 }, 500).to({ z: 0 }, 500).to({ z: Math.PI/2 }, 500).to({ z: 0 }, 500);
      createjs.Tween.get(right_lower_arm.position, { loop: false }).wait(500).to(rot_pt1, 500).to(rightLowerArmInitialPosition, 500).to(rot_pt1, 500).to(rightLowerArmInitialPosition, 500);  
}

function poliquineloAnimation(){

    //Posicao final do braço da direita
    var rot_pt;
    var right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
    rot_pt = new THREE.Vector3
        (
            (( right_upper_arm.geometry.parameters.width + right_upper_arm.position.x) / 2)+0.25,
            (( right_upper_arm.geometry.parameters.height + right_upper_arm.position.y) / 2.25)+1 ,
            0
        );
    var rightUpperArmInitialPosition = right_upper_arm.position;

    //Posicao do braço da direita quando estiver em PI/2 
    var rot_pt_RightArmMiddlePosition;
    rot_pt_RightArmMiddlePosition = new THREE.Vector3
        (
            (( right_upper_arm.geometry.parameters.width + right_upper_arm.position.x) / 2)+1.5,
            ( right_upper_arm.geometry.parameters.height + right_upper_arm.position.y) / 2.25,
            0
        );

    //Posicao final do braço da esquerda
    var rot_pt_leftArm;
    var left_upper_arm = ( (robot.getObjectByName("left_upper_arm")) )
    rot_pt_leftArm = new THREE.Vector3
        (
            (( left_upper_arm.geometry.parameters.width + left_upper_arm.position.x) / 2)-1.75,
            (( left_upper_arm.geometry.parameters.height + left_upper_arm.position.y) / 2.25)+1 ,
            0
        );
    var leftUpperArmInitialPosition = left_upper_arm.position;

    //Posicao do braço da direita quando estiver em -(PI/2) 
    rot_pt_leftArmMiddlePosition = new THREE.Vector3
    (
        (( left_upper_arm.geometry.parameters.width + left_upper_arm.position.x) / 2)-3,
        ( left_upper_arm.geometry.parameters.height + left_upper_arm.position.y) / 2.25,
        0
    );
    
    //Posição final da perna da direita
    var rot_pt_rightLeg;
    var right_upper_leg = ( (robot.getObjectByName("right_upper_leg")) )
    rot_pt_rightLeg = new THREE.Vector3
        (
            (( right_upper_leg.geometry.parameters.width + right_upper_leg.position.x) / 2)-2,
            (( right_upper_leg.geometry.parameters.height + right_upper_leg.position.y) / 2.25)-3 ,
            0
        );
    var rightUpperLegInitialPosition = right_upper_leg.position;

    //Posição final da perna da esquerda
    var rot_pt_leftLeg;
    var left_upper_leg = ( (robot.getObjectByName("left_upper_leg")) )
    rot_pt_leftLeg = new THREE.Vector3
        (
            (( left_upper_leg.geometry.parameters.width + left_upper_leg.position.x) / 2)+0.75,
            (( left_upper_leg.geometry.parameters.height + left_upper_leg.position.y) / 2.25)-3 ,
            0
        );
    var leftUpperLegInitialPosition = left_upper_leg.position;

    //Movimento do corpo todo
    var torso = ( (robot.getObjectByName("torso")) )
    createjs.Tween.get(torso.position, { loop: true }).to({ y:  1 }, 250, createjs.Ease.getPowInOut(0.7)).to({ y:  -1 }, 250, createjs.Ease.getPowInOut(0.7)).wait(500).to({ y: 1 }, 250, createjs.Ease.getPowInOut(0.7)).to({ y: 0 }, 250, createjs.Ease.getPowInOut(0.7));

    //movimentoDaPernaDireita
    createjs.Tween.get(right_upper_leg.rotation, { loop: true }).to({ z:  -Math.PI/4 }, 500, createjs.Ease.getPowInOut(0.7)).wait(500).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(right_upper_leg.position, { loop: true }).to(rot_pt_rightLeg, 500, createjs.Ease.getPowInOut(0.7)).wait(500).to(rightUpperLegInitialPosition, 500, createjs.Ease.getPowInOut(0.7));

    //movimentoDaPernaEsquerda
    createjs.Tween.get(left_upper_leg.rotation, { loop: true }).to({ z:  Math.PI/4 }, 500, createjs.Ease.getPowInOut(0.7)).wait(500).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(left_upper_leg.position, { loop: true }).to(rot_pt_leftLeg, 500, createjs.Ease.getPowInOut(0.7)).wait(500).to(leftUpperLegInitialPosition, 500, createjs.Ease.getPowInOut(0.7));

    //Movimento do Braço da direita
    createjs.Tween.get(right_upper_arm.rotation, { loop: true }).to({ z: 1.075 * Math.PI }, 500, createjs.Ease.getPowInOut(0.7)).wait(500).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(right_upper_arm.position, { loop: true }).to(rot_pt_RightArmMiddlePosition, 250, createjs.Ease.getPowInOut(0.7)).to(rot_pt, 250, createjs.Ease.getPowInOut(0.7)).wait(500).to(rot_pt_RightArmMiddlePosition, 250, createjs.Ease.getPowInOut(0.7)).to(rightUpperArmInitialPosition, 250, createjs.Ease.getPowInOut(0.7));

    //Movimento do Braço da esquerda
    createjs.Tween.get(left_upper_arm.rotation, { loop: true }).to({ z: - 1.075 * Math.PI }, 500, createjs.Ease.getPowInOut(0.7)).wait(500).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(left_upper_arm.position, { loop: true }).to(rot_pt_leftArmMiddlePosition, 250, createjs.Ease.getPowInOut(0.7)).to(rot_pt_leftArm, 250, createjs.Ease.getPowInOut(0.7)).wait(500).to(rot_pt_leftArmMiddlePosition, 250, createjs.Ease.getPowInOut(0.7)).to(leftUpperArmInitialPosition, 250, createjs.Ease.getPowInOut(0.7));
    
}

function taekwondoKick(){
    //posição final do braço inferior da direita
    var right_lower_arm = ( (robot.getObjectByName("right_upper_arm")).getObjectByName("lower_arm") );
    var rot_pt_RightLowerArm = new THREE.Vector3
        (
            (( 0) / 2)+1,
            (( right_lower_arm.position.y  ) / 1.6),
            0
    ); 
    var rightLowerArmInitialPosition = right_lower_arm.position;

    //posição final do braço inferior da esquerda
    var left_lower_arm = ( (robot.getObjectByName("left_upper_arm")).getObjectByName("lower_arm") );
    var rot_pt_leftLowerArm = new THREE.Vector3
        (
            (( 0) / 2)+1,
            (( left_lower_arm.position.y  ) / 1.6),
            0
    ); 
    var leftLowerArmInitialPosition = left_lower_arm.position;

    //Posição final do braço superior direito
    var rot_pt_rightUpperArm;
    var right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
    rot_pt_rightUpperArm = new THREE.Vector3
        (
            (( right_upper_arm.geometry.parameters.width + right_upper_arm.position.x) / 2)+1.5,
            (( right_upper_arm.geometry.parameters.height + right_upper_arm.position.y) / 2.25)-1,
            0
        );
      var rightUpperArmInitialPosition = right_upper_arm.position;

    //Posição final do braço superior esquerdo
    var rot_pt_leftUpperArm;
    var left_upper_arm = ( (robot.getObjectByName("left_upper_arm")) )
    rot_pt_leftUpperArm = new THREE.Vector3
        (
            (( left_upper_arm.geometry.parameters.width + left_upper_arm.position.x) / 2)-0.5,
            (( left_upper_arm.geometry.parameters.height + left_upper_arm.position.y) / 2.25)-1,
            0
        );
    var leftUpperArmInitialPosition = left_upper_arm.position;

    //Posicao final da perna da esquerda
    var rot_pt_leftLeg;
    var left_upper_leg = ( (robot.getObjectByName("left_upper_leg")) )
    rot_pt_leftLeg = new THREE.Vector3
        (
            (( left_upper_leg.geometry.parameters.width + left_upper_leg.position.x) / 2)+0.75,
            (( left_upper_leg.geometry.parameters.height + left_upper_leg.position.y) / 2.25)-2 ,
            0
        );
    var leftUpperLegInitialPosition = left_upper_leg.position;

    //Posicao final da perna inferior esquerda
    var left_lower_leg = ( (robot.getObjectByName("left_upper_leg")).getObjectByName("left_lower_leg") );
    var rot_pt_leftLowerleg = new THREE.Vector3
        (
            (( 0) / 2)-1,
            (( left_lower_arm.position.y  ) / 1.6),
            0
    ); 
    var leftLowerLegInitialPosition = left_lower_leg.position;

    //movimento Da Perna inferior Esquerda
    createjs.Tween.get(left_lower_leg.rotation, { loop: false }).wait(1000).to({ z:  -Math.PI/2 }, 500, createjs.Ease.getPowInOut(0.7)).to({ z: 0 }, 250, createjs.Ease.getPowInOut(0.7)).to({ z:  -Math.PI/2 }, 250, createjs.Ease.getPowInOut(0.7)).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(left_lower_leg.position, { loop: false }).wait(1000).to(rot_pt_leftLowerleg, 500, createjs.Ease.getPowInOut(0.7)).to(leftLowerLegInitialPosition, 250, createjs.Ease.getPowInOut(0.7)).to(rot_pt_leftLowerleg, 250, createjs.Ease.getPowInOut(0.7)).to(leftLowerLegInitialPosition, 500, createjs.Ease.getPowInOut(0.7));

    //movimento Da Perna superior Esquerda
    createjs.Tween.get(left_upper_leg.rotation, { loop: false }).wait(1000).to({ z:  3*Math.PI/4 }, 500, createjs.Ease.getPowInOut(0.7)).wait(2000).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(left_upper_leg.position, { loop: false }).wait(1000).to(rot_pt_leftLeg, 500, createjs.Ease.getPowInOut(0.7)).wait(2000).to(leftUpperLegInitialPosition, 500, createjs.Ease.getPowInOut(0.7));
    
    //Movimento do braço superior esquerdo
    createjs.Tween.get(left_upper_arm.rotation, { loop: false }).wait(500).to({ z: Math.PI/4 }, 500, createjs.Ease.getPowInOut(0.7)).wait(2500).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(left_upper_arm.position, { loop: false }).wait(500).to(rot_pt_leftUpperArm, 500, createjs.Ease.getPowInOut(0.7)).wait(2500).to(leftUpperArmInitialPosition, 500, createjs.Ease.getPowInOut(0.7));

    //Movimento do braço superior direito
    createjs.Tween.get(right_upper_arm.rotation, { loop: false }).wait(500).to({ z: Math.PI/4 }, 500, createjs.Ease.getPowInOut(0.7)).wait(2500).to({ z: 0 }, 500, createjs.Ease.getPowInOut(0.7));
    createjs.Tween.get(right_upper_arm.position, { loop: false }).wait(500).to(rot_pt_rightUpperArm, 500, createjs.Ease.getPowInOut(0.7)).wait(2500).to(rightUpperArmInitialPosition, 500, createjs.Ease.getPowInOut(0.7));
  
    //Movimento do braço inferior da esquerda
    createjs.Tween.get(right_lower_arm.rotation, { loop: false }).wait(500).to({ z: Math.PI/2 }, 500).wait(2500).to({ z: 0 }, 500);
    createjs.Tween.get(right_lower_arm.position, { loop: false }).wait(500).to(rot_pt_RightLowerArm, 500).wait(2500).to(rightLowerArmInitialPosition, 500);  

    //Movimento do braço inferior da direita
    createjs.Tween.get(left_lower_arm.rotation, { loop: false }).wait(500).to({ z: Math.PI/2 }, 500).wait(2500).to({ z: 0 }, 500);
    createjs.Tween.get(left_lower_arm.position, { loop: false }).wait(500).to(rot_pt_leftLowerArm, 500).wait(2500).to(leftLowerArmInitialPosition, 500);  

}


function init() {
  var width = 40;
  var height = 22;
  scene = new THREE.Scene();
  camera =  new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 2 );
  camera.lookAt( 0, 0, -1);
  camera.position.z = 1;

  robot = gen_robot();
  scene.add(robot);


  renderer = new THREE.WebGLRenderer();
  window.addEventListener('resize', onWindowResize, false);
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement);
 
  //waveAnimation();
  //poliquineloAnimation();
  //taekwondoKick();



  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", animate);
 
}
 
function animate() {
  renderer.render(scene, camera);
}