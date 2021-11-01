window.$ = window.jQuery = require('jquery');

// get current time.
function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatBox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Función que se ejecuta al presionar enter en el chatBox
function getResponse() {

    let userText = $("#textInput").val();

    // Si no se escribe nada, termina la función
    if (userText == "") {
        return;
    }

    // Sends the message to twitch.py
    twitch.send(userText).end;

    // Create chat message from recieved data
    let userHtml = `
                <article class="msg-container msg-self" id="msg-0">
                    <div class="msg-box">
                        <div class="flr">
                            <div class="messages">
                                <span class="timestamp"><span class="username">You</span><span class="posttime">` + moment().format('hh:mm A') + `</span></span>
                                <br>
                                <p class="msg" id="msg-0">
                                    ` + userText + `
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="icon-container">
                    <img class="user-img" id="user-0" src="https://gravatar.com/avatar/56234674574535734573000000000001?d=retro" />
                    <img class="status-circle" id="user-0" src="./images/twitch-icon.png" />
                </div>
                </article>`;

    // Appends the message to the main chat box (shows the message)
    $("#chatBox").append(userHtml);

    // Auto-scrolls the window to the last recieved message
    let [lastMsg] = $('.msg-container').last();
    lastMsg.scrollIntoView({ behavior: 'smooth' });
    $("#textInput").val("");
}

function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatBox").append(userHtml);
    document.getElementById("mid").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

//Función que se ejecuta cuando se presiona "enter" en el cuadro de texto de escribir
$("#textInput").on("keydown", function(e) {
    if (e.which == 13) {
        getResponse();
    }
});

//Función que se ejecuta cuando se le da clic al botón de enviar mensaje
$("#SendButton").on("click", function() {
    getResponse();
})

// Left panel retract function
$('.circle-left').on("click", function() {
    let spWidthLeft = $('.sidepanel-left').width();
    let spMarginLeft = parseInt($('.sidepanel-left').css('margin-left'), 10);
    let w = (spMarginLeft >= 0) ? spWidthLeft * -1 : 0;
    let cw = (w < 0) ? -w : spWidthLeft;
    $('.sidepanel-left').animate({
        marginLeft: w
    });
    $('.sidepanel-left span').animate({
        marginLeft: w
    });
    $('.circle-left').animate({
        left: cw
    }, function() {
        $('.fa-chevron-left').toggleClass('hide');
        $('.fa-chevron-right').toggleClass('hide');
    });
});

// Right panel retract function
$('.circle-right').on("click", function() {
    let spWidthRight = $('.sidepanel-right').width();
    let spMarginRight = parseInt($('.sidepanel-right').css('margin-right'), 10);
    let w = (spMarginRight >= 0) ? spWidthRight * -1 : 0;
    let cw = (w < 0) ? -w : spWidthRight;
    $('.sidepanel-right').animate({
        marginRight: w
    });
    $('.sidepanel-right span').animate({
        marginRight: w
    });
    $('.circle-right').animate({
        right: cw
    }, function() {
        $('.fa-chevron-left').toggleClass('hide');
        $('.fa-chevron-right').toggleClass('hide');
    });
});

// TODO: animate Optionpanels
// Function that shows and hides the option panels. (TTS, Configuration, Commands)
const display_panel = (panelSelectorClass, panelSelectorID, btnSelectorID) => {
    const btn = document.querySelector(btnSelectorID);
    const panel = document.querySelector(panelSelectorID);
    const panels = document.querySelectorAll(panelSelectorClass);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        panels.forEach(el => {
            if (el == panel) return;
            el.classList.remove('show');
        })
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
        } else {
            panel.classList.add('show');
        }
    }, {
        capture: true
    })
}

display_panel('.OptionPanel', '#Configuration', '#btnConfiguration');
display_panel('.OptionPanel', '#Commands', '#btnCommands');
display_panel('.OptionPanel', '#TTS', '#btnTTS');
display_panel('.OptionPanel', '#Chat', '#btnChat');

const display_panelx = (panelSelectorClass, panelSelectorID, btnSelectorID) => {
    const btn = document.querySelector(btnSelectorID);
    const panel = document.querySelector(panelSelectorID);
    const panels = document.querySelectorAll(panelSelectorClass);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        panels.forEach(el => {
            if (el == panel) return;
            el.classList.remove('item-active');
        })
        if (panel.classList.contains('item-active')) {
            panel.classList.remove('item-active');
        } else {
            panel.classList.add('item-active');
        }
    }, {
        capture: true
    })
}

display_panelx('.item', '#btnTTS', '#btnTTS');
display_panelx('.item', '#btnChat', '#btnChat');
display_panelx('.item', '#btnCommands', '#btnCommands');
display_panelx('.item', '#btnConfiguration', '#btnConfiguration');

// Volume slider
var $slider = $("#slider");

slider.addEventListener('change', setRange)

function setRange(event) {
    value = event.target.value;
    document.getElementById('SoundVolume').innerText = value + "%";
}
var $fill = $(".bar .fill");

function setBar() {
    $fill.css("width", $slider.val() + "%");
}

$slider.on("input", setBar);

setBar();

function showFrontLayer() {
    document.getElementById('bg_mask').style.visibility = 'visible';
    document.getElementById('frontlayer').style.visibility = 'visible';
}

function hideFrontLayer() {
    document.getElementById('bg_mask').style.visibility = 'hidden';
    document.getElementById('frontlayer').style.visibility = 'hidden';
}

$("#ShowAdvancedMenu").on("click", function() {
    document.getElementById('bg_mask').style.visibility = 'visible';
    document.getElementById('frontlayer').style.visibility = 'visible';
})

$("#HideAdvancedMenu").on("click", function() {
    document.getElementById('bg_mask').style.visibility = 'hidden';
    document.getElementById('frontlayer').style.visibility = 'hidden';
})

$("#TTSTestButton").on("click", function() {
    var text = document.getElementById('TTSTest').value;
    selectedVoiceIndex = installedTTS.options[installedTTS.selectedIndex].text;
    selectedEncodingIndex = encodingSelect.options[config.SETTINGS.ENCODING].text;
    sayQueue.add(text, selectedVoiceIndex, selectedEncodingIndex);
})

$("#SoundTestButton").on("click", function() {
    playSound()
})

$(".SaveButton").on("click", function() {
    // Settings
    config.SETTINGS.VOICE = installedTTS.selectedIndex;
    config.SETTINGS.VOICE_VOLUME;
    config.SETTINGS.NOTIFICATION_VOLUME = parseInt(document.getElementById('SoundVolume').innerText);
    config.SETTINGS.NOTIFICATION_SOUND = sound.selectedIndex;
    config.SETTINGS.RESOLUTION = resolutionSelect.selectedIndex;
    config.SETTINGS.ENCODING = encodingSelect.selectedIndex;

    // Twitch settings
    config.TWITCH.CLIENT_ID = document.getElementById('CLIENT_ID').value;
    config.TWITCH.CLIENT_SECRET = document.getElementById('CLIENT_SECRET').value;
    config.TWITCH.OAUTH_TOKEN = document.getElementById('OAUTH_TOKEN').value;
    config.TWITCH.CHANNEL_NAME = document.getElementById('TWITCH_CHANNEL_NAME').value;
    config.TWITCH.USERNAME = document.getElementById('USERNAME').value;

    // Youtube settings
    config.YOUTUBE.YOUTUBE_KEY = document.getElementById('YOUTUBE_KEY').value;
    config.YOUTUBE.CHANNEL_ID = document.getElementById('CHANNEL_ID').value;
    config.YOUTUBE.CHANNEL_NAME = document.getElementById('YOUTUBE_CHANNEL_NAME').value;
    config.YOUTUBE.USE_YOUTUBE_API_KEY = document.getElementById('USE_YOUTUBE_API_KEY').checked;

    //Facebook settings
    config.FACEBOOK.ACCESS_TOKEN = document.getElementById('ACCESS_TOKEN').value;
    config.FACEBOOK.FACEBOOK_PAGE = document.getElementById('FACEBOOK_PAGE').value;

    fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(config))
});