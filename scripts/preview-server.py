"""Serve the exported portfolio unchanged through temporary preview tunnels."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent intermediary HTML rewriting and stale assets during local rebuilds.
        self.send_header('Cache-Control', 'no-store, no-transform')
        super().end_headers()
if __name__ == '__main__':
    output = Path(__file__).resolve().parents[1] / 'out'
    ThreadingHTTPServer(('127.0.0.1', 4173), partial(PreviewHandler, directory=str(output))).serve_forever()
