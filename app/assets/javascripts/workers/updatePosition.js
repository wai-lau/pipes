function updateUserPosition(position) {
    console.log('sending ajax')
    $.ajax({
        url: "https://pipes.wailau.net/moves",
        method: "POST",
        data: {
            move : {
                content: position,
                url: GLOBAL_URL
            }
        },
        contentType: "multipart/form-data",
        success: function(data){
            console.log(data);
        },
        error: function(errMsg) {
            console.log(JSON.stringify(errMsg));
        }
    });
}

function success(pos) {
  console.log(JSON.stringify(pos.coords));
  let position = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
  }
  updateUserPosition(position);
  console.log(position);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

var options = {
  enableHighAccuracy: true,
  maximumAge: 0
};

function getCurrentLocation() {
  return navigator.geolocation.getCurrentPosition(success, error, options)
}

getCurrentLocation();
setInterval(getCurrentLocation, 5000);
