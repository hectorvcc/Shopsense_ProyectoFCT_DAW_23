const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const photoButton = document.querySelector('#photo-button');
const microButton = document.querySelector('#micro-button');
const cameraSwitchButton = document.querySelector('#camera-switch-button');
let currentFacingMode = "environment";

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error(`Failed to get user media: ${error}`);
    });

//Pedir permisos para usar el micro		
microButton.addEventListener("click", () =>
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then((stream) => {
        microButton.srcObject = stream;
    }).catch((error) => console.log(error))
)

//Para permitir el cambio de camara delantera a trasera y viceversa
cameraSwitchButton.addEventListener("click", () => {
    if (currentFacingMode === "user") {
        currentFacingMode = "environment";
    } else {
        currentFacingMode = "user";
    }
    initCamera();
});

//Pedir permisos para usar la camara
function initCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error al obtener el acceso a la camara", error);
        });
}
initCamera();

photoButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);

});


//Alerta de que se ha enviado la imagen
  photoButton.addEventListener('click', () => {
    var alertNode = document.querySelector('.card-body');
    alertNode.innerHTML = '<div class="alert alert-success" role="alert"> <h4 class="alert-heading">¡Enviado!</h4> <p>La imagen se ha enviado correctamente.</p> <hr> <p class="mb-0">Gracias por usar nuestra aplicación.</p> </div>';
    
    //Esperamos 5 segunfos y recargamos la pagina
    setTimeout(function(){ location.reload(); }, 10000);

  });
