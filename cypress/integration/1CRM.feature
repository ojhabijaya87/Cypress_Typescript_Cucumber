Feature: 1CRM Demo Automation

  Background: User visit the application
    Given  User visit the application

  Scenario Outline: Create Contact
    Given User login to the application with "<username>" and "<password>"
    When User hover to "Sales & Marketing"
    When User click on "Contacts"
    When User create contact
    Then Validate user is created
    Examples:
      | username | password |
      | admin    | admin    |

  Scenario Outline: Create Contact - Fail Scenario
    Given User login to the application with "<username>" and "<password>"
    When User hover to "Sales & Marketing"
    When User click on "Contacts"
    When User create contact
    Then Fail test
    Examples:
      | username | password |
      | admin    | admin    |

  # @focus
  Scenario Outline: Select Theme
    When User select "<theme>"
    Then Selected theme is "<theme>"
    
    Examples:
      | theme         |
      | Delight Theme |
