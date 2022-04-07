package com.example.numberguess;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    TextView tvInfo;
    EditText etInput;
    Button bControl;

    Integer guessedNumber;
    boolean gameFinished;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        guessedNumber = (int)(Math.random() * 100);
        gameFinished = false;

        tvInfo = (TextView)findViewById(R.id.main_textview);
        etInput = (EditText)findViewById(R.id.main_edittext);
        bControl = (Button)findViewById(R.id.main_button);

    }

    public void onClick(View v) {
        if (gameFinished == true) {
            guessedNumber = (int)(Math.random() * 100);
            gameFinished = false;
            tvInfo.setText(getResources().getString(R.string.try_to_guess));
            bControl.setText(getResources().getString(R.string.input_value));

        } else {
            try {
                Integer n = Integer.parseInt(etInput.getText().toString());

                if (n > guessedNumber) {
                    tvInfo.setText(getResources().getString(R.string.ahead));
                } else if (n > guessedNumber) {
                    tvInfo.setText(getResources().getString(R.string.behind));
                } else {
                    tvInfo.setText(getResources().getString(R.string.hit));
                    bControl.setText(getResources().getString(R.string.play_more));
                    gameFinished = true;
                }

            } catch (NumberFormatException e){
                tvInfo.setText(getResources().getString(R.string.error));
            }
        }
    }
}