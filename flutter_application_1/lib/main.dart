import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter App',
      theme: ThemeData(
        useMaterial3: true,
      ),
      home: HomePage(title: 'Example 4: Flutter')
      // home: const Center(
      //   child: SizedBox(
      //     width: 360.0, // Width of the app
      //     child: HomePage(title: 'Example 4: Flutter'),
      //   ),
      // ),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          backgroundColor: const Color.fromARGB(255, 1, 134, 121),
          title: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                widget.title,
                style: const TextStyle(
                  color: Colors.white,
                ),
                textAlign: TextAlign.left,
              ))),
      body: Center(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 16.0),
              child: Image.asset(
                'assets/circle.png',
                width: 135.0,
                height: 135.0,
              ),
            ),
            const SizedBox(height: 60.0),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                MyButton(text: 'Button'),
                MyButton(text: 'Button'),
              ],
            ),
            const SizedBox(height: 20.0),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                MyButton(text: 'Button'),
                MyButton(text: 'Button'),
              ],
            ),
            const SizedBox(height: 20.0),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                SizedBox(
                    width: 100.0,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[Text('Email:')],
                    )),
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: '',
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 100.0),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class MyButton extends StatelessWidget {
  final String text;

  const MyButton({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    Color lighterGrey = Colors.grey.withOpacity(0.7);
    return ElevatedButton(
      onPressed: () {},
      style: ButtonStyle(
        foregroundColor: WidgetStateProperty.all(Colors.black),
        backgroundColor: WidgetStateProperty.all(lighterGrey),
        elevation: WidgetStateProperty.all(0),
        shape: WidgetStateProperty.all<RoundedRectangleBorder>(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(3.0),
          ),
        ),
      ),
      child: Text(text),
    );
  }
}
