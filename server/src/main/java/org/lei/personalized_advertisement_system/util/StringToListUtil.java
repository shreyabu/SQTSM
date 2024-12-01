package org.lei.personalized_advertisement_system.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StringToListUtil {
    public static List<String> toList(String string) {
        return new ArrayList<>(Arrays.asList(string.split(",")));
    }
}
