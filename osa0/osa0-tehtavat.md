# Osa 0 Tehtävät

## Tehtävä 0.4

Tämä sekvenssikaavio kuvaa sellaisen tilanteen, jossa käyttäjä luo uuden muistiinpanon sivulla https://studies.cs.helsinki.fi/exampleapp/notes.

```mermaid
sequenceDiagram
	participant browser
    participant server
	
	Note right of browser: Selain lähettää palvelimelle käyttäjän syöttämän muistiinpanon HTTPS POST-pyynnöllä.
	
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTML-tiedosto
    deactivate server
	
	Note right of browser: Selain pyytää palvelimelta HTML-koodin HTTPS GET pyynnöllä. HTML-koodi määrittää sivun sisällön ja rakenteen.
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML-tiedosto
    deactivate server
	
	Note right of browser: HTML-koodi saa aikaan seuraavan kutsun, jossa selain hakee css-koodin, joka määrittelee sivun tyylit.
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: css-tiedosto
    deactivate server
	
	Note right of browser: HTML-koodi saa aikaan myös kutsun, jossa selain hakee JavaScript-koodin.
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript-tiedosto
    deactivate server
	
	Note right of browser: Selain alkaa suorittamaan JavaScript-koodia, joka hakee GET-pyynnöllä muistiinpanot json-muotoisena raakadatana.
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: muistiinpanot: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: Selain suorittaa tapahtumankäsittelijän, joka renderöi muistiinpanot näytölle.
	
```
	
## Tehtävä 0.5

Tämä sekvenssikaavio kuvaa sellaisen tilanteen, jossa käyttäjä menee osoitteeseen https://studies.cs.helsinki.fi/exampleapp/spa, joka on muistiinpanojen Single Page App -versio.

```mermaid
sequenceDiagram
	participant browser
    participant server

    Note right of browser: Selain pyytää palvelimelta HTML-koodin HTTPS GET pyynnöllä.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML-tiedosto
    deactivate server

    Note right of browser: HTML-koodi saa aikaan kutsun, jossa selain hakee css-koodin.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: css-tiedosto
    deactivate server

    Note right of browser: HTML-koodi saa aikaan myös kutsun, jossa selain hakee JavaScript-koodin.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JavaScript-tiedosto
    deactivate server

    Note right of browser: Selain alkaa suorittamaan JavaScript-koodia, joka hakee GET-pyynnöllä muistiinpanot json-muotoisena raakadatana.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: muistiinpanot: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: Selain suorittaa tapahtumankäsittelijän, joka renderöi muistiinpanot näytölle.   

```

## Tehtävä 0.6

Tämä sekvenssikaavio kuvaa sellaisen tilanteen, jossa käyttäjä luo uuden muistiinpanon Single Page App -versiossa.

```mermaid
sequenceDiagram
	participant browser
    participant server

    Note right of browser: Selain lähettää palvelimelle uuden muistiinpanon json-muodossa. Muita pyyntöjä ei tehdä ja sivua ei tarvitse ladata uudestaan.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: muistiinpano
    deactivate server 

```


