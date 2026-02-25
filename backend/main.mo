import Map "mo:core/Map";
import Bool "mo:core/Bool";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  type UserCredential = {
    password : Text;
  };

  type RegisterResult = {
    #success : Text;
    #error : Text;
  };

  public type AuthRole = {
    #owner;
    #visitor;
  };

  public type UserProfile = {
    username : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let users = Map.empty<Text, UserCredential>();

  var maintenanceMode = false;

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Profile management - requires #user role
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin-only: toggle maintenance mode
  public shared ({ caller }) func toggleMaintenanceMode() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle maintenance mode");
    };
    maintenanceMode := not maintenanceMode;
  };

  // Open to all: read maintenance mode
  public query func getMaintenanceMode() : async Bool {
    maintenanceMode;
  };

  // Open to all: register a new user
  public shared func registerUser(username : Text, password : Text) : async RegisterResult {
    if (username == "" or password == "") {
      return #error("Username and password are required");
    };

    switch (users.get(username)) {
      case (null) {
        users.add(username, { password });
        #success("User successfully registered");
      };
      case (?_) {
        #error("The provided username is already in use");
      };
    };
  };

  // Open to all: authenticate with username/password
  public shared func authenticate(username : Text, password : Text) : async AuthRole {
    switch (users.get(username)) {
      case (?credentials) {
        if (credentials.password == password) { #owner } else { #visitor };
      };
      case (null) { Runtime.trap("User not found") };
    };
  };

  // Open to all: informational endpoint
  public query func passwordNeedsHash() : async Bool {
    true;
  };

  // Open to all: check username availability
  public query func isUsernameTaken(username : Text) : async Bool {
    users.containsKey(username);
  };
};
