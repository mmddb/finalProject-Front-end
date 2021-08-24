import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
    name: "directionsRenderer",
    distance:'',
    duration:'',
    ctr() {
        return window.google.maps.DirectionsRenderer;
    },

    events: [],
    mappedProps: {},
    props: {
        origin: { type: String },
        destination: { type: String },
        travelMode: { type: String }
    },

    afterCreate(directionsRenderer) {
        let directionsService = new window.google.maps.DirectionsService();
        let destination = this.destination;
        let origin = this.origin;
        let travelMode = this.travelMode;
        console.log(origin);
        console.log(destination);

        directionsService.route(
            {
                origin,
                destination,
                travelMode
            },
            (response, status) => {
                if (status !== "OK") return;
                directionsRenderer.setDirections(response);

                this.distance = JSON.stringify(response.routes[0].legs[0].distance.text);
                this.duration = JSON.stringify(response.routes[0].legs[0].duration.text);
                console.log('distance: ' + this.distance);
                console.log('duration: ' + this.duration);

                // 存到 localstorage 里面
                localStorage.setItem("distance", this.distance);
                localStorage.setItem("duration", this.duration);
            }
        );
    },

    method: {
        getDistance () {
            return this.distance;
        }
    },
});
