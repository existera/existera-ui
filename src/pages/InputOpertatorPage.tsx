import { ExSelect } from "@/lib";
import ExComboBoxItem from "@/lib/components/ComboBox/ExComboBoxItem";
import ExDatePicker from "@/lib/components/DatePicker/ExDatePicker";
import ExDateRange from "@/lib/components/DateRange/ExDateRange";
import ExDateRangeCalendar from "@/lib/components/DateRange/ExDateRangeCalendar";
import ExInput from "@/lib/components/Input/ExInput";
import ExInputOperator from "@/lib/components/InputOperator/ExInputOperator";
import ExTextarea from "@/lib/components/Textarea/ExTextarea";
import ExTimeSelector from "@/lib/components/TimeSelector/ExTimeSelector";
import { OnThisPage } from "@/shared/documentation/OnThisPageDocumentation";
import PageContent from "@/shared/documentation/PageContent";
import { ArrowBigRight, Book, User } from "lucide-react";

export default function InputOperatorPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
  ];
  return (
    <PageContent section={section}>
      <div className="w-full">
        <h1>Input Operator</h1>
        <div className="grid gap-5">
          <ExInputOperator size="md" state="error">
            <ExInputOperator.Prefix>Prefix</ExInputOperator.Prefix>
            {/* <ExInput state="error" />
            <ExInputOperator.Operator>=</ExInputOperator.Operator>
            <ExComboBox state="error">
              <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
              <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
              <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
            </ExComboBox>
            <ExInputOperator.Operator>=</ExInputOperator.Operator> */}
            <ExTimeSelector state="error" />
            <ExInputOperator.Operator>=</ExInputOperator.Operator>
            <ExTextarea autoResize rows={1} state="error" />
            <ExInputOperator.Operator>=</ExInputOperator.Operator>
            <ExDatePicker state="error" />
            <ExInputOperator.Suffix>Suffix</ExInputOperator.Suffix>
          </ExInputOperator>
          <ExInputOperator size="xs">
            <ExInputOperator.Prefix>Prefix</ExInputOperator.Prefix>
            <ExDatePicker leftIcon={<User size={16} />} state="error" />
            <ExInputOperator.Operator>
              <ArrowBigRight size={16} />
            </ExInputOperator.Operator>
            <ExSelect leftIcon={<Book size={16} />} state="error" />
            <ExInputOperator.Suffix>Suffix</ExInputOperator.Suffix>
          </ExInputOperator>
          <ExInputOperator radius="full" size="xs">
            <ExInputOperator.Prefix>Prefix</ExInputOperator.Prefix>
            <ExTimeSelector leftIcon={<User size={16} />} state="error" />
            <ExInputOperator.Operator>
              <ArrowBigRight size={16} />
            </ExInputOperator.Operator>
            <ExTextarea leftIcon={<Book size={16} />} state="error" />
            <ExInputOperator.Suffix>Suffix</ExInputOperator.Suffix>
          </ExInputOperator>
          <ExInputOperator radius="full">
            <ExInput leftIcon={<User size={16} />} state="error" />
            <ExInputOperator.Operator>
              <ArrowBigRight size={16} />
            </ExInputOperator.Operator>
            <ExInput rightIcon={<Book size={16} />} state="error" />
          </ExInputOperator>
          <ExInput />
        </div>
      </div>
    </PageContent>
  );
}
