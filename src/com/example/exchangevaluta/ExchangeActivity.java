package com.example.exchangevaluta;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.Window;
import android.webkit.WebView;

public class ExchangeActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_exchange);
        WebView webView = (WebView) findViewById(R.id.webView1);
        webView.getSettings().setBuiltInZoomControls(true);
        webView.getSettings().setJavaScriptEnabled(true);

        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_exchange, menu);
        return true;
    }
    
}
