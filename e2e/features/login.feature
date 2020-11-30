Feature: Login

  Scenario Outline: As a user, I recieve an error message when using invalid credentials to log into the application

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see an error message saying <message>

    Examples:
      | username        | password         | message                      |
      | CD2 Team        | empty_string     | The password field is empty. |
      | empty_string    | 4y94hr4uejfhekj  | The username field is empty. |

  Scenario: As a user, I can login

    Given I am on the login page
    When I login as an admin
    Then I should be on the admin dashboard page
