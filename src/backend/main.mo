import Map "mo:core/Map";
import Array "mo:base/Array";
import Time "mo:base/Time";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type UserCredential = {
    password : Text;
  };

  type UserProfile = {
    username : Text;
  };

  // Keep old stable variables to maintain upgrade compatibility
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  let users = Map.empty<Text, UserCredential>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Pre-existing stable var — kept as-is
  var maintenanceMode = false;

  // New: visitor tracking
  var visitTimestamps : [Int] = [];

  public shared func logVisit() : async () {
    visitTimestamps := Array.append(visitTimestamps, [Time.now()]);
  };

  public query func getVisits() : async [Int] {
    visitTimestamps;
  };

  public shared func toggleMaintenanceMode() : async () {
    maintenanceMode := not maintenanceMode;
  };

  public query func getMaintenanceMode() : async Bool {
    maintenanceMode;
  };
};
