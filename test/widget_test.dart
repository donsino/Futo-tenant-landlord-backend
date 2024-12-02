import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:futo_tenants/login_page.dart'; // Reference LoginPage directly.
import 'package:futo_tenants/signup_page.dart'; // Reference SignupPage directly.

void main() {
  testWidgets('Login Page displays correctly', (WidgetTester tester) async {
    // Build the LoginPage widget.
    await tester.pumpWidget(MaterialApp(home: LoginPage()));

    // Check if the Email and Password text fields are present.
    expect(find.byType(TextField), findsNWidgets(2)); // Email and Password fields.

    // Check if the Login button is present.
    expect(find.text('Login'), findsOneWidget);

    // Check if the "Don’t have an account? Sign Up" button is present.
    expect(find.text("Don’t have an account? Sign Up"), findsOneWidget);
  });

  testWidgets('Sign Up navigation works', (WidgetTester tester) async {
    // Build the LoginPage widget and check navigation.
    await tester.pumpWidget(MaterialApp(
      initialRoute: '/login',
      routes: {
        '/login': (context) => LoginPage(),
        '/signup': (context) => SignupPage(),
      },
    ));

    // Tap on the Sign Up button.
    await tester.tap(find.text("Don’t have an account? Sign Up"));
    await tester.pumpAndSettle();

    // Verify that the SignUpPage is displayed.
    expect(find.text('Sign Up'), findsOneWidget);
  });
}
