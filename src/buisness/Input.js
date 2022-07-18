export const Action = {
    Left: "Left",
    FastDrop: "FastDrop",
    Pause: "Pause",
    Quit: "Quit",
    Right: "Right",
    Rotate: "Rotate",
    SlowDrop: "SlowDrop",
    Hold: "Hold"

};

export const Key = {
    38: Action.Rotate,
    40: Action.SlowDrop,
    37: Action.Left,
    39: Action.Right,
    81: Action.Quit,
    80: Action.Pause,
    32: Action.FastDrop,
    67: Action.Hold
};

export const actionIsDrop = (action) =>
    [Action.SlowDrop, Action.FastDrop].includes(action);

export const actionForKey = (keyCode) => Key[keyCode];
