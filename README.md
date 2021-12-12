# RPi webradio player

Simple HTTP server that spawns a webradio player. From your phone, plays audio on your HiFi.

Requires: `ffplay`, `nodejs`.

Load at startup: copy `webradio.service` into `/etc/systemd/system/`. Then run `sudo systemctl start webradio.service` and `sudo systemctl enable webradio.service`.

## License

GPLv3
