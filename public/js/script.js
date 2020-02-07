function generateGif() {
    const form = document.getElementById('genereForm');
    const img = document.getElementById('genereGif');
    const linkInput = document.getElementById('gifLink');
    let imgUrl = '/serve?';

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        getDate();
        imgUrl = '/serve?';
        let json = toJSONString(e.target);
        json = JSON.parse(json);

        for (const key of Object.keys(json)) {
            if (json[key]) {
                json[key].startsWith('#')
                    ? json[key] = json[key].slice(1)
                    : json[key] = json[key];

                imgUrl.slice(-1) === "?"
                    ? imgUrl = `${imgUrl}${key}=${json[key]}`
                    : imgUrl = `${imgUrl}&${key}=${json[key]}`;
            }

            // change gif url
            img.src = imgUrl;

            // show link
            linkInput.value = window.location.href.slice(0, -1) + imgUrl
        }

    }, false);

    function getDate() {
        const endDataInput = document.getElementById('endDate');
        const endTimeInput = document.getElementById('endTime');
        const timeInput = document.getElementById('time');

        if (endTimeInput.value && endTimeInput.value) {
            timeInput.value = `${endDataInput.value}T${endTimeInput.value}`
        }
    }

    function toJSONString(form) {
        let obj = {};
        const elements = form.querySelectorAll("input, select, textarea");

        elements.forEach((el) => {
            let name = el.name;
            let value = el.value;

            name
                ? obj[name] = value
                : ""
        });

        return JSON.stringify(obj);
    }

    function bgColor(inputClass) {
        const inputs = document.querySelectorAll(`.${inputClass}`);

        inputs.forEach((el) => {
            el.addEventListener('change', () => {
                setValue(el.value)
            })
        });

        function setValue(val) {
            inputs.forEach((el) => {
                el.value = val
            })
        }
    }

    bgColor('colorInput');
    bgColor('colorInput2');
}

document.addEventListener('DOMContentLoaded', function () {
    generateGif();
});
