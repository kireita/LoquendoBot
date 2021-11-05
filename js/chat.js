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
    let userHtmlUser = `
                <article class="msg-container msg-self" id="msg-0">
                    <div class="icon-container-user">
                        <img class="user-img-user" id="user-0" src="https://gravatar.com/avatar/56234674574535734573000000000001?d=retro" />
                        <img class="status-circle-user" id="user-0" src="./images/twitch-icon.png" />
                    </div>
                    <div class="msg-box-user">
                        <div class="flr">
                            <div class="messages-user">
                                <span class="timestamp"><span class="username">You</span><span class="posttime">` + moment().format('hh:mm A') + `</span></span>
                                <br>
                                <p class="msg" id="msg-0">
                                    ` + userText + `
                                </p>
                            </div>
                        </div>
                    </div>
                </article>`;

    // Appends the message to the main chat box (shows the message)
    $("#chatBox").append(userHtmlUser);

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


// Show/Hide Advanced Menu
function showFrontLayer() {
    document.getElementById('AdvancedMenu_mask').style.visibility = 'visible';
}

function hideFrontLayer() {
    document.getElementById('AdvancedMenu_mask').style.visibility = 'hidden';
}

$("#ShowAdvancedMenu").on("click", function() {
    document.getElementById('AdvancedMenu_mask').style.visibility = 'visible';
})

$("#HideAdvancedMenu").on("click", function() {
    document.getElementById('AdvancedMenu_mask').style.visibility = 'hidden';
})

// Show/Hide Theme Creator
function showFrontLayer() {
    document.getElementById('ThemeCreator_mask').style.visibility = 'visible';
}

function hideFrontLayer() {
    document.getElementById('ThemeCreator_mask').style.visibility = 'hidden';
}

$("#ShowThemeCreator").on("click", function() {
    document.getElementById('ThemeCreator_mask').style.visibility = 'visible';
})

$("#HideThemeCreator").on("click", function() {
    document.getElementById('ThemeCreator_mask').style.visibility = 'hidden';
})

// Theme changer
$("#MAIN_COLOR_1").on("change", function() {
    var x = document.getElementById("MAIN_COLOR_1").value
    root.style.setProperty('--main-color1', x);
})

$("#MAIN_COLOR_2").on("change", function() {
    var x = document.getElementById("MAIN_COLOR_2").value
    root.style.setProperty('--main-color2', x);
})

$("#MAIN_COLOR_3").on("change", function() {
    var x = document.getElementById("MAIN_COLOR_3").value
    root.style.setProperty('--main-color3', x);
})

$("#MAIN_COLOR_4").on("change", function() {
    var x = document.getElementById("MAIN_COLOR_4").value
    root.style.setProperty('--main-color4', x);
})

$("#TOP_BAR").on("change", function() {
    var x = document.getElementById("TOP_BAR").value
    root.style.setProperty('--top-bar', x);
})

$("#MID_SECTION").on("change", function() {
    var x = document.getElementById("MID_SECTION").value
    root.style.setProperty('--mid-section', x);
})

$("#CHAT_BUBBLE_BG").on("change", function() {
    var x = document.getElementById("CHAT_BUBBLE_BG").value
    root.style.setProperty('--chat-bubble', x);
})

$("#CHAT_BUBBLE_HEADER").on("change", function() {
    var x = document.getElementById("CHAT_BUBBLE_HEADER").value
    root.style.setProperty('--chat-bubble-header', x);
})

$("#CHAT_BUBBLE_MESSAGE").on("change", function() {
    var x = document.getElementById("CHAT_BUBBLE_MESSAGE").value
    root.style.setProperty('--chat-bubble-message', x);
})



$("#TTSTestButton").on("click", function() {
    var text = document.getElementById('TTSTest').value;
    var voice = document.getElementById('installedTTS');
    var encoding = document.getElementById('encoding');

    selectedVoice = voice.options[voice.selectedIndex].text;
    selectedEncoding = encoding.options[encoding.selectedIndex].text;
    talk.add(text, selectedVoice, selectedEncoding);
    console.log(voice);
    // /initScript.CheckForPython();
});

$("#resolution").on("change", function() {
    var resolution = document.getElementById('resolution');
    selectedResolution = resolution.options[resolution.selectedIndex].text;
    var numbers = selectedResolution.match(/\d+/g).map(Number);
    ipcRenderer.send('resize-window', numbers[0], numbers[1]);
});

$("#min-button").on("click", function() {
    ipcRenderer.send('minimize-window');
});

$("#max-button").on("click", function() {
    ipcRenderer.send('maximize-window');
});

$("#close-button").on("click", function() {
    ipcRenderer.send('close-window');
});


$("#SoundTestButton").on("click", function() {
    if (selectedNotificationSound.paused && !isPlaying) {
        var notificationSound = document.getElementById('notification');
        selectedNotificationSound.src = './sounds/' + sound.options[notificationSound.selectedIndex].text;
        selectedNotificationSound.volume = notificationSoundVolume;
        selectedNotificationSound.play();
    }
})

$(".SaveButton").on("click", function() {
    // Settings
    config.SETTINGS.VOICE = installedTTS.selectedIndex;
    config.SETTINGS.VOICE_VOLUME;
    config.SETTINGS.NOTIFICATION_VOLUME = parseInt(document.getElementById('SoundVolume').innerText);
    config.SETTINGS.NOTIFICATION_SOUND = sound.selectedIndex;
    config.SETTINGS.RESOLUTION = resolutionSelect.selectedIndex;
    config.SETTINGS.ENCODING = encodingSelect.selectedIndex;

    // Theme
    config.THEME.MAIN_COLOR_1 = document.getElementById('MAIN_COLOR_1').value
    config.THEME.MAIN_COLOR_2 = document.getElementById('MAIN_COLOR_2').value
    config.THEME.MAIN_COLOR_3 = document.getElementById('MAIN_COLOR_3').value
    config.THEME.MAIN_COLOR_4 = document.getElementById('MAIN_COLOR_4').value
    config.THEME.TOP_BAR = document.getElementById('TOP_BAR').value
    config.THEME.MID_SECTION = document.getElementById('MID_SECTION').value
    config.THEME.CHAT_BUBBLE_BG = document.getElementById('CHAT_BUBBLE_BG').value
    config.THEME.CHAT_BUBBLE_HEADER = document.getElementById('CHAT_BUBBLE_HEADER').value
    config.THEME.CHAT_BUBBLE_MESSAGE = document.getElementById('CHAT_BUBBLE_MESSAGE').value

    // Twitch settings
    config.TWITCH.USE_TWITCH = document.getElementById('USE_TWITCH').checked;
    config.TWITCH.CLIENT_ID = document.getElementById('CLIENT_ID').value;
    config.TWITCH.CLIENT_SECRET = document.getElementById('CLIENT_SECRET').value;
    config.TWITCH.OAUTH_TOKEN = document.getElementById('OAUTH_TOKEN').value;
    config.TWITCH.CHANNEL_NAME = document.getElementById('TWITCH_CHANNEL_NAME').value;
    config.TWITCH.USERNAME = document.getElementById('USERNAME').value;

    // Youtube settings
    config.YOUTUBE.USE_YOUTUBE = document.getElementById('USE_YOUTUBE').checked;
    config.YOUTUBE.YOUTUBE_KEY = document.getElementById('YOUTUBE_KEY').value;
    config.YOUTUBE.CHANNEL_ID = document.getElementById('CHANNEL_ID').value;
    config.YOUTUBE.CHANNEL_NAME = document.getElementById('YOUTUBE_CHANNEL_NAME').value;
    config.YOUTUBE.USE_YOUTUBE_API_KEY = document.getElementById('USE_YOUTUBE_API_KEY').checked;

    //Facebook settings
    config.FACEBOOK.USE_FACEBOOK = document.getElementById('USE_FACEBOOK').checked;
    config.FACEBOOK.ACCESS_TOKEN = document.getElementById('ACCESS_TOKEN').value;
    config.FACEBOOK.FACEBOOK_PAGE = document.getElementById('FACEBOOK_PAGE').value;

    fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(config))
});

// Use twitch toggle logic
$("#USE_TWITCH").on("click", function() {
    setTwitchToggle();
    console.log("lol");
});

function setTwitchToggle() {
    var toggle = document.getElementById('USE_TWITCH').checked;
    var inputs = document.getElementsByClassName('inputTwitch')
    toggleRadio(toggle, inputs);
}

setTwitchToggle();

// Use Youtube toggle logic
$("#USE_YOUTUBE").on("click", function() {
    setYoutubeToggle();
});

function setYoutubeToggle() {
    var toggle = document.getElementById('USE_YOUTUBE').checked;
    var inputs = document.getElementsByClassName('inputYoutube')
    toggleRadio(toggle, inputs);
}

setYoutubeToggle();

// Use Facebook toggle logic
$("#USE_FACEBOOK").on("click", function() {
    setFacebookToggle();
});

function setFacebookToggle() {
    var toggle = document.getElementById('USE_FACEBOOK').checked;
    var inputs = document.getElementsByClassName('inputFacebook')
    toggleRadio(toggle, inputs);
}

setFacebookToggle();

function toggleRadio(toggle, inputs) {
    if (toggle == true) {
        for (var i = 0; i < inputs.length; i++) { inputs[i].disabled = false; }
    } else {
        for (var i = 0; i < inputs.length; i++) { inputs[i].disabled = true; }
    }
}

$("#Info_CLIENT_ID").on("click", function() {
    shell.openExternal("https://dev.twitch.tv/login");
});

$("#Info_OAUTH_TOKEN").on("click", function() {
    shell.openExternal("https://twitchapps.com/tmi/");
});

$("#Info_YOUTUBE_KEY").on("click", function() {
    shell.openExternal("https://developers.google.com/youtube/v3/getting-started");
});

$("#Info_CHANNEL_ID").on("click", function() {
    shell.openExternal("https://support.google.com/youtube/answer/3250431");
});

$("#Info_CLIENT_ID").on("click", function() {
    shell.openExternal("https://dev.twitch.tv/login");
});

$("#Info_ACCESS_TOKEN").on("click", function() {
    shell.openExternal("https://developers.facebook.com/docs/marketing-apis/overview/authentication/");
});


// TODO: get livechatid for youtube chat to be able to send messages