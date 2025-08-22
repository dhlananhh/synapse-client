"use client";

import React, { useState } from "react";
import { useLocale } from '@/context/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/libs/languages';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SettingsRow from "../SettingsRow";
import ChangeDisplayLanguageDialog from "../dialogs/ChangeDisplayLanguageDialog";
import ChangeContentLanguagesDialog from "../dialogs/ChangeContentLanguagesDialog";
import { ChevronRight } from "lucide-react";


export default function PreferencesTab() {
  const [ isDisplayLangDialogOpen, setIsDisplayLangDialogOpen ] = useState(false);
  const [ isContentLangDialogOpen, setIsContentLangDialogOpen ] = useState(false);
  const { displayLanguage, contentLanguages } = useLocale();

  const currentLanguageObject = SUPPORTED_LANGUAGES.find(l => l.code === displayLanguage);
  const currentDisplayLangName = currentLanguageObject?.name || "English";
  const CurrentFlagComponent = currentLanguageObject?.FlagComponent;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="uppercase">Feed Preferences</CardTitle>
        </CardHeader>
        <CardContent className="p-0">

          <h3 className="font-semibold text-sm px-4 pt-2 text-muted-foreground uppercase tracking-wider">
            Language
          </h3>

          <div onClick={ () => setIsDisplayLangDialogOpen(true) } className="cursor-pointer">
            <SettingsRow title="Display language" description="Select the language for your UI">
              <div className="flex items-center gap-2">
                <span className="text-xl w-6 h-6 flex items-center justify-center">
                  { CurrentFlagComponent && <CurrentFlagComponent /> }
                </span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Button>

              </div>
            </SettingsRow>
          </div>

          <div onClick={ () => setIsContentLangDialogOpen(true) } className="cursor-pointer">
            <SettingsRow
              title="Content languages"
              description="Choose languages for the content you see"
            >
              <Button variant="outline" size="sm">Change</Button>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </SettingsRow>
          </div>

          <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">
            Content
          </h3>
          <SettingsRow
            title="Show mature content (I'm over 18)"
            description="See Not Safe for Work (NSFW) content in your feeds"
          >
            <Switch defaultChecked />
          </SettingsRow>
          <SettingsRow
            title="Blur mature images and media"
            description="Blur NSFW content until you click to view it">
            <Switch defaultChecked />
          </SettingsRow>
          <SettingsRow
            title="Show recommendations in home feed"
            description="Allow us to suggest content and communities for you"
          >
            <Switch defaultChecked />
          </SettingsRow>
          <SettingsRow
            title="Muted communities"
            description="Manage communities you've muted"
            href="#"
          >
            <span></span>
          </SettingsRow>

          <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">
            Experience
          </h3>
          <SettingsRow
            title="Default feed view"
            description="Choose how your feed is displayed"
            href="#"
          >
            <span>Card</span>
          </SettingsRow>
          <SettingsRow
            title="Open posts in new tab"
            description="Automatically open posts in a new browser tab"
          >
            <Switch />
          </SettingsRow>

          <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">Accessibility</h3>
          <SettingsRow
            title="Autoplay media"
            description="Play videos and GIFs automatically when they are in view"
          >
            <Switch defaultChecked />
          </SettingsRow>
          <SettingsRow
            title="Reduce Motion"
            description="Reduce animations and motion effects"
          >
            <Switch />
          </SettingsRow>

        </CardContent >
      </Card >


      <ChangeDisplayLanguageDialog
        isOpen={ isDisplayLangDialogOpen }
        onOpenChange={ setIsDisplayLangDialogOpen }
      />
      <ChangeContentLanguagesDialog
        isOpen={ isContentLangDialogOpen }
        onOpenChange={ setIsContentLangDialogOpen }
      />
    </>
  );
}
