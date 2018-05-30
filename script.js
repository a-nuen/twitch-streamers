let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getInfo() {
    let html = '';
    streamers.forEach((streamer) => {
        let status;
        let game;
        let surl = 'https://wind-bow.glitch.me/twitch-api/streams/' + streamer;
        fetch(surl)
        .then(res => res.json())
        .then(data => { console.log(data)
            if(data.stream === null) {
                status = 'Offline';
                game = 'Offline';
            } else {
                status = 'Online';
                game = data.stream.game + ': ';
            }
            let url = 'https://wind-bow.glitch.me/twitch-api/channels/' + streamer;
            fetch(url)
            .then(res => res.json())
            .then(data => { console.log(data);
                let description = status === 'Offline' ? '' : data.status;
                html += 
                `
                    <div class='grid-container ${status}'>
                        <div class='logo'><img class='logo' src='${data.logo}'></div>
                        <div class='name'><a href=${data.url} target=_blank>${data.display_name}</a></div>
                        <div class='status'>${game}${description}</div>
                    </div>
                `
                document.querySelector('.grid').innerHTML = html;
                offlineColor();
            })
        });
    });
}

getInfo();

function showAll() {
    document.querySelector('#all').style.color = 'white';
    document.querySelector('#online').style.color = 'black';
    document.querySelector('#offline').style.color = 'black';
    let x = document.querySelectorAll('.Offline');
    for(let i = 0; i < x.length; i++) {
        x[i].style.display = 'grid';
    }
    
    let y = document.querySelectorAll('.Online');
    for(let i = 0; i < y.length; i++) {
        y[i].style.display = 'grid';
    }
}

function showOnline() {
    document.querySelector('#all').style.color = 'black';
    document.querySelector('#online').style.color = 'white';
    document.querySelector('#offline').style.color = 'black';
    let x = document.querySelectorAll('.Offline');
    for(let i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    
    let y = document.querySelectorAll('.Online');
    for(let i = 0; i < y.length; i++) {
        y[i].style.display = 'grid';
    }
}

function showOffline() {
    document.querySelector('#online').style.color = 'black';
    document.querySelector('#offline').style.color = 'white';
    document.querySelector('#all').style.color = 'black';
    let x = document.querySelectorAll('.Offline');
    for(let i = 0; i < x.length; i++) {
        x[i].style.display = 'grid';
    }
    
    let y = document.querySelectorAll('.Online');
    for(let i = 0; i < y.length; i++) {
        y[i].style.display = 'none';
    }
}

function offlineColor() {
    let x = document.querySelectorAll('.Offline');
    for(let i = 0; i < x.length; i++) {
        x[i].style.background = '#fcca94';
    }
}

